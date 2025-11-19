# lms frontend

### setup instruction

1. clone the project
'''
git clone https://github.com/Varun1461/lms-frontend-hn.git

'''
2. move into the directory
'''
cd lms-frontend-hn

'''
3. install depedencies
'''
npm i
'''

3. run the server
'''
npm run dev
'''



### setup instructions for tailwind

[tailwind official instruction doc] https://tailwindcss.com/docs/installation

1. instsll tailwind
'''
npm install -D tailwindcss
'''

2. create tailwind config file
'''
npx tailwindcss init
'''

3. add file extensions to tailwind file cnfig file in the context property

'''
  content: ["./src/**/*.{html,jsx,ts,tsx,js}"],
'''
4. add the tailwind directives at the top of the  the 'index.css' file
'''
@tailwind base;
@tailwind components;
@tailwind utilities;
'''
5. Add the following details in the plugins property of tailwing config
'''
require("daisyui"), require("@tailwindcss/line-clamp")
'''


### adding plugins and dependencies

'''
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axi os react-hot-toast @tailwindcss/line-clamp

'''
1. post css autoprefixer
'''
npm install postcss autoprefixer
'''

