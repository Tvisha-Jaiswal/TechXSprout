// // import React from 'react'

// // const App = () => {
// //   return (
// //     <>
// //     <div className='text-5xl'>App</div>
// //     <p>Hello </p>

// //     </>
// //   )
// // }

// // export default App


// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { login , signup as register} from "./authService";



// function App() {
//   const [userInput, setUserInput] = useState("");
//   const [submittedText, setSubmittedText] = useState("");
//   const [isSignUpOpen, setIsSignUpOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8000/generate-website/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_prompt: userInput }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data from backend");
//       }

//       const data = await response.json();
//       setSubmittedText(JSON.stringify(data, null, 2)); // Pretty-print JSON response
//       setUserInput("");
//     } catch (error) {
//       console.error("Error:", error);
//       setSubmittedText("Error connecting to backend.");
//     }
//   };

//   const [loginData, setLoginData] = useState({ email: "", password: "" });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(loginData);
//       console.log("Login Success:", response);
//       setIsLoginOpen(false);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await register(registerData);
//         console.log("Registration Success:", response);
//         setIsSignUpOpen(false);
//     } catch (error) {
//         console.error(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 text-gray-100">
//       {/* Header */}
//       <header className="bg-gray-900 bg-opacity-80 shadow-md">
//         <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <span className="text-2xl font-extrabold text-blue-400">TechXSprouts</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={() => setIsLoginOpen(true)} 
//               className="relative z-50 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600 hover:text-white transition duration-300"
//             >
//               Sign In
//             </button>
//             <button 
//               onClick={() => setIsSignUpOpen(true)} 
//               className="relative z-50 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600 hover:text-white transition duration-300"
//             >
//               Sign Up
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <main className="container mx-auto px-6 py-16 text-center">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-pulse">
//             PixelForge - Website Generator
//           </h1>
//           <p className="text-lg text-gray-300 mb-8">
//             Your one-stop solution for creating sleek, modern websites effortlessly.
//           </p>
//         </div>

//         {/* User Input Section */}
//         <div className="max-w-2xl mx-auto mt-10">
//           <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-75 p-6 rounded-xl shadow-lg border border-gray-800">
//             <h3 className="text-xl mb-3 text-gray-300">What would you like to build today:</h3>
//             <div className="relative">
//               <input
//                 type="text"
//                 className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-300"
//                 placeholder="Give your prompt here..."
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
//               >
//                 ➜
//               </button>
//             </div>
//           </form>

//           {submittedText && (
//             <div className="mt-6 p-6 bg-gray-900 bg-opacity-80 shadow-lg rounded-lg border border-gray-800 animate-fade-in">
//               <h4 className="text-lg font-semibold text-gray-300">Your Input:</h4>
//               <p className="text-gray-400">{submittedText}</p>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 bg-opacity-80 mt-20 py-8 shadow-inner">
//         <div className="container mx-auto px-6 text-center text-gray-400">
//           <p>© 2025 TechXSprouts. All rights reserved.</p>
//         </div>
//       </footer>

//       {/* Login Modal */}
//       {isLoginOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black">
//             <button onClick={() => setIsLoginOpen(false)} className="absolute top-2 right-2 text-gray-600">
//               <FaTimes size={20} />
//             </button>

//             <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//             <form className="space-y-4" onSubmit={handleLogin}>
//               <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}/>
//               <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}/>
//               <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
//             </form>

//             <p className="text-center text-sm mt-4">
//               Don't have an account?{" "}
//               <button onClick={() => { setIsLoginOpen(false); setIsSignUpOpen(true); }} className="text-blue-500">
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Sign Up Modal */}
//       {isSignUpOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black">
//             <button onClick={() => setIsSignUpOpen(false)}className="absolute top-2 right-2 text-gray-600">
//               <FaTimes size={20} />
//             </button>

//             <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
//             <form className="space-y-4" onSubmit={handleRegister}>
//               <input type="text" placeholder="Username" className="w-full p-2 border rounded-md" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
//               <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}/>
//               <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}/>
//               <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Sign Up</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { login, signup as register } from "./authService";

// function App() {
//   const [userInput, setUserInput] = useState("");
//   const [submittedText, setSubmittedText] = useState("");
//   const [isSignUpOpen, setIsSignUpOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8000/generate-website/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ request_text: userInput }), // Ensure this matches the backend's expected input
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch data from backend");
//       }

//       const data = await response.json();
//       setSubmittedText(JSON.stringify(data, null, 2)); // Pretty-print JSON response
//       setUserInput("");
//     } catch (error) {
//       console.error("Error:", error);
//       setSubmittedText("Error connecting to backend.");
//     }
//   };

//   // ... rest of the code remains the same

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 text-gray-100">
//       {/* Header */}
//       <header className="bg-gray-900 bg-opacity-80 shadow-md">
//         <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <span className="text-2xl font-extrabold text-blue-400">TechXSprouts</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setIsLoginOpen(true)}
//               className="relative z-50 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600 hover:text-white transition duration-300"
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => setIsSignUpOpen(true)}
//               className="relative z-50 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600 hover:text-white transition duration-300"
//             >
//               Sign Up
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <main className="container mx-auto px-6 py-16 text-center">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-pulse">
//             PixelForge - Website Generator
//           </h1>
//           <p className="text-lg text-gray-300 mb-8">
//             Your one-stop solution for creating sleek, modern websites effortlessly.
//           </p>
//         </div>

//         {/* User Input Section */}
//         <div className="max-w-2xl mx-auto mt-10">
//           <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-75 p-6 rounded-xl shadow-lg border border-gray-800">
//             <h3 className="text-xl mb-3 text-gray-300">What would you like to build today:</h3>
//             <div className="relative">
//               <input
//                 type="text"
//                 className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-300"
//                 placeholder="Give your prompt here..."
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
//               >
//                 ➜
//               </button>
//             </div>
//           </form>

//           {submittedText && (
//             <div className="mt-6 p-6 bg-gray-900 bg-opacity-80 shadow-lg rounded-lg border border-gray-800 animate-fade-in">
//               <h4 className="text-lg font-semibold text-gray-300">Your Input:</h4>
//               <p className="text-gray-400">{submittedText}</p>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 bg-opacity-80 mt-20 py-8 shadow-inner">
//         <div className="container mx-auto px-6 text-center text-gray-400">
//           <p>© 2025 TechXSprouts. All rights reserved.</p>
//         </div>
//       </footer>

//       {/* Login Modal */}
//       {isLoginOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black">
//             <button onClick={() => setIsLoginOpen(false)} className="absolute top-2 right-2 text-gray-600">
//               <FaTimes size={20} />
//             </button>

//             <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//             <form className="space-y-4" onSubmit={handleLogin}>
//               <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}/>
//               <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}/>
//               <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
//             </form>

//             <p className="text-center text-sm mt-4">
//               Don't have an account?{" "}
//               <button onClick={() => { setIsLoginOpen(false); setIsSignUpOpen(true); }} className="text-blue-500">
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Sign Up Modal */}
//       {isSignUpOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black">
//             <button onClick={() => setIsSignUpOpen(false)}className="absolute top-2 right-2 text-gray-600">
//               <FaTimes size={20} />
//             </button>

//             <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
//             <form className="space-y-4" onSubmit={handleRegister}>
//               <input type="text" placeholder="Username" className="w-full p-2 border rounded-md" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
//               <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}/>
//               <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}/>
//               <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Sign Up</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { login, signup as register } from "./authService";

// function App() {
//   const [userInput, setUserInput] = useState("");
//   const [generatedFiles, setGeneratedFiles] = useState([]);
//   const [isSignUpOpen, setIsSignUpOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Step 1: Generate the website files
//       const generateResponse = await fetch("http://localhost:8000/generate-website/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_prompt: userInput }),
//       });

//       if (!generateResponse.ok) {
//         throw new Error("Failed to generate website");
//       }

//       const generateData = await generateResponse.json();

//       if (generateData.error) {
//         throw new Error(generateData.error);
//       }

//       // Step 2: Set the list of generated files
//       setGeneratedFiles(generateData.files);
//       setUserInput("");
//     } catch (error) {
//       console.error("Error:", error);
//       setGeneratedFiles([]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 text-gray-100">
//       {/* Header */}
//       <header className="bg-gray-900 bg-opacity-80 shadow-md">
//         <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <span className="text-2xl font-extrabold text-blue-400">TechXSprouts</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setIsLoginOpen(true)}
//               className="relative z-50 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600 hover:text-white transition duration-300"
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => setIsSignUpOpen(true)}
//               className="relative z-50 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600 hover:text-white transition duration-300"
//             >
//               Sign Up
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <main className="container mx-auto px-6 py-16 text-center">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-pulse">
//             PixelForge - Website Generator
//           </h1>
//           <p className="text-lg text-gray-300 mb-8">
//             Your one-stop solution for creating sleek, modern websites effortlessly.
//           </p>
//         </div>

//         {/* User Input Section */}
//         <div className="max-w-2xl mx-auto mt-10">
//           <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-75 p-6 rounded-xl shadow-lg border border-gray-800">
//             <h3 className="text-xl mb-3 text-gray-300">What would you like to build today:</h3>
//             <div className="relative">
//               <input
//                 type="text"
//                 className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-300"
//                 placeholder="Give your prompt here..."
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
//               >
//                 ➜
//               </button>
//             </div>
//           </form>

//           {/* Display Download Links */}
//           {generatedFiles.length > 0 && (
//             <div className="mt-6 p-6 bg-gray-900 bg-opacity-80 shadow-lg rounded-lg border border-gray-800 animate-fade-in">
//               <h4 className="text-lg font-semibold text-gray-300">Generated Files:</h4>
//               <ul className="mt-4 space-y-2">
//                 {generatedFiles.map((file, index) => (
//                   <li key={index} className="text-gray-400">
//                     <a
//                       href={`http://localhost:8000/download-file/${file}`}
//                       download
//                       className="text-cyan-400 hover:text-cyan-300"
//                     >
//                       {file}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 bg-opacity-80 mt-20 py-8 shadow-inner">
//         <div className="container mx-auto px-6 text-center text-gray-400">
//           <p>© 2025 TechXSprouts. All rights reserved.</p>
//         </div>
//       </footer>

//       {/* Login Modal */}
//       {isLoginOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black">
//             <button onClick={() => setIsLoginOpen(false)} className="absolute top-2 right-2 text-gray-600">
//               <FaTimes size={20} />
//             </button>

//             <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//             <form className="space-y-4" onSubmit={handleLogin}>
//               <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}/>
//               <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}/>
//               <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
//             </form>

//             <p className="text-center text-sm mt-4">
//               Don't have an account?{" "}
//               <button onClick={() => { setIsLoginOpen(false); setIsSignUpOpen(true); }} className="text-blue-500">
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Sign Up Modal */}
//       {isSignUpOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black">
//             <button onClick={() => setIsSignUpOpen(false)}className="absolute top-2 right-2 text-gray-600">
//               <FaTimes size={20} />
//             </button>

//             <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
//             <form className="space-y-4" onSubmit={handleRegister}>
//               <input type="text" placeholder="Username" className="w-full p-2 border rounded-md" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
//               <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}/>
//               <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}/>
//               <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Sign Up</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { login, signup as register } from "./authService";

function App() {
  const [userInput, setUserInput] = useState("");
  const [generatedFiles, setGeneratedFiles] = useState([]);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Generate the website files
      const generateResponse = await fetch("http://localhost:8000/generate-website/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_prompt: userInput }),
      });

      if (!generateResponse.ok) {
        throw new Error("Failed to generate website");
      }

      const generateData = await generateResponse.json();

      if (generateData.error) {
        throw new Error(generateData.error);
      }

      // Step 2: Set the list of generated files
      setGeneratedFiles(generateData.files);
      setUserInput("");
    } catch (error) {
      console.error("Error:", error);
      setGeneratedFiles([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 bg-opacity-80 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-blue-400">TechXSprouts</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="relative z-50 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600 hover:text-white transition duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUpOpen(true)}
              className="relative z-50 px-4 py-2 bg-transparent border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-600 hover:text-white transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-pulse">
            PixelForge - Website Generator
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Your one-stop solution for creating sleek, modern websites effortlessly.
          </p>
        </div>

        {/* User Input Section */}
        <div className="max-w-2xl mx-auto mt-10">
          <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-75 p-6 rounded-xl shadow-lg border border-gray-800">
            <h3 className="text-xl mb-3 text-gray-300">What would you like to build today:</h3>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-300"
                placeholder="Give your prompt here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
              >
                ➜
              </button>
            </div>
          </form>

          {/* Display Download Links */}
          {generatedFiles.length > 0 && (
            <div className="mt-6 p-6 bg-gray-900 bg-opacity-80 shadow-lg rounded-lg border border-gray-800 animate-fade-in">
              <h4 className="text-lg font-semibold text-gray-300">Generated Files:</h4>
              <ul className="mt-4 space-y-2">
                {generatedFiles.map((file, index) => (
                  <li key={index} className="text-gray-400">
                    <a
                      href={`http://localhost:8000/download-file/${file}`}
                      download={file}  // Ensure the browser downloads the file
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 bg-opacity-80 mt-20 py-8 shadow-inner">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2025 TechXSprouts. All rights reserved.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black">
            <button onClick={() => setIsLoginOpen(false)} className="absolute top-2 right-2 text-gray-600">
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}/>
              <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}/>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
            </form>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <button onClick={() => { setIsLoginOpen(false); setIsSignUpOpen(true); }} className="text-blue-500">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {isSignUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative text-black">
            <button onClick={() => setIsSignUpOpen(false)}className="absolute top-2 right-2 text-gray-600">
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleRegister}>
              <input type="text" placeholder="Username" className="w-full p-2 border rounded-md" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}/>
              <input type="password" placeholder="Password" className="w-full p-2 border rounded-md" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}/>
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;