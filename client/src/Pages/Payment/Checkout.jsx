import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice.js";
import { useEffect } from "react";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { BiRupee } from "react-icons/bi";


function Checkout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
  const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
  const userData = useSelector((state) => state?.auth?.data);
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  const handleSubscription = async (event) => {
    event.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("something went wrong");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Monthly Subscription",
      theme: {
        color: '#F37254'
      },
      prefill: {
        email: userData.email,
        name: userData.fullName
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        toast.success("Payment Successful");

     const result = await dispatch(verifyUserPayment(paymentDetails));

if (verifyUserPayment.fulfilled.match(result)) {
  // 🔥 refresh user data


  toast.success("Subscription successful");

  navigate("/checkout/success");
    await dispatch(getUserData());
} else {
  toast.error("Subscription failed");
  navigate("/checkout/fail");
}
      }
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  }

  async function load() {
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        {/* checkout card */}
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>

          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all the available courses
              of our platform for {" "}
              <span className="text-yellow-500 font-bold">1 Year Duration</span>
              . <br />
              All the existing and new launched courses will be available to you
              in this subscription bundle
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> <span>499</span>only
            </p>

            <div className="text-gray-200">
              <p>100% refund at cancellation</p>
              <p>* Terms & Condition Applied</p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
          >
            Buy Now
          </button>
        </div>
      </form>

    </HomeLayout>
  );

}



export default Checkout;