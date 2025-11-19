import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import AppError from '../utils/error.util.js';
import sendemail from '../utils/sendemail.js';
import User from '../models/user.model.js';

// 📌 Contact Us Controller
export const contactUs = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new AppError('Name, Email, and Message are required', 400));
  }

  try {
    const subject = 'Contact Us Form';
    const textMessage = `${name} - ${email}\n\n${message}`; // ✅ Fixed new lines

    // Send email
    const emailSent = await sendemail(process.env.CONTACT_US_EMAIL, subject, textMessage);
    if (!emailSent) {
      return next(new AppError('Failed to send email', 500));
    }

    res.status(200).json({
      success: true,
      message: 'Your request has been submitted successfully',
    });
  } catch (error) {
    console.error("Error in contactUs:", error);
    return next(new AppError(error.message || 'Failed to send email', 500));
  }
});

// 📌 User Stats Controller
export const userStats = asyncHandler(async (req, res, next) => {
  try {
    const allUsersCount = await User.countDocuments();
    const subscribedUsersCount = await User.countDocuments({
      'subscription.status': 'active',
    });

    res.status(200).json({
      success: true,
      message: 'All registered users count',
      allUsersCount,
      subscribedUsersCount,
    });
  } catch (error) {
    console.error("Error in userStats:", error);
    return next(new AppError('Failed to fetch user statistics', 500));
  }
});
