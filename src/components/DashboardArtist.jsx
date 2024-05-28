import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { getAllArtist } from "../api";
import { actionType } from "../context/reducer";

const DashboardArtist = () => {
  const [{ artists }, dispatch] = useStateValue();

  useEffect(() => {
    console.log("DashboardArtist component mounted");
    if (!artists) {
      console.log("Fetching artists...");
      getAllArtist()
        .then((data) => {
          console.log("Artists fetched:", data);
          dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
        })
        .catch((error) => {
          console.error("Failed to fetch artists:", error);
        });
    } else {
      console.log("Artists already available:", artists);
    }
  }, [artists, dispatch]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3 my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        {artists && artists.length > 0 ? (
          artists.map((data, index) => (
            <ArtistCard key={index} data={data} index={index} />
          ))
        ) : (
          <p>No artists found</p>
        )}
      </div>
    </div>
  );
};

export const ArtistCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <img
        src={data?.imageURL}
        className="w-full h-40 object-cover rounded-md"
        alt={data.name}
      />
      <p className="text-base text-textColor">{data.name}</p>
      <div className="flex items-center gap-4">
        <a href={data.instagram} target="_blank" rel="noopener noreferrer">
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
          </motion.i>
        </a>
        <a href={data.twitter} target="_blank" rel="noopener noreferrer">
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
          </motion.i>
        </a>
      </div>
      <motion.i
        className="absolute bottom-2 right-2"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className="text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
      </motion.i>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 p-2 bg-darkOverlay backdrop-blur-md flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-100 text-base text-center">
            Are you sure do you want to delete this?
          </p>
          <div className="flex items-center w-full justify-center gap-3">
            <div className="bg-red-300 px-3 rounded-md">
              <p className="text-headingColor text-sm">Yes</p>
            </div>
            <div
              className="bg-green-300 px-3 rounded-md"
              onClick={() => setIsDelete(false)}
            >
              <p className="text-headingColor text-sm">No</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardArtist;


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
// import { MdDelete } from "react-icons/md";

// const ArtistCard = ({ data, index, onDelete }) => {
//   const [isDelete, setIsDelete] = useState(false);

//   const handleDeleteClick = () => {
//     setIsDelete(true);
//   };

//   const handleYesClick = () => {
//     onDelete();
//     setIsDelete(false);
//   };

//   const handleNoClick = () => {
//     setIsDelete(false);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, translateX: -50 }}
//       animate={{ opacity: 1, translateX: 0 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
//       className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
//     >
//       <img
//         src={data?.imageURL}
//         className="w-full h-40 object-cover rounded-md"
//         alt=""
//       />

//       <p className="text-base text-textColor">{data.name}</p>
//       <div className="flex items-center gap-4">
//         <a href={data.instagram} target="_blank">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//         <a href={data.twitter} target="_blank">
//           <motion.i whileTap={{ scale: 0.75 }}>
//             <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
//           </motion.i>
//         </a>
//       </div>
//       <motion.i
//         className="absolute bottom-2 right-2"
//         whileTap={{ scale: 0.75 }}
//         onClick={handleDeleteClick}
//       >
//         <MdDelete className=" text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
//       </motion.i>

//       {isDelete && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           className="absolute inset-0 p-2 bg-darkOverlay  backdrop-blur-md flex flex-col items-center justify-center gap-4"
//         >
//           <p className="text-gray-100 text-base text-center">
//             Are you sure you want to delete this?
//           </p>
//           <div className="flex items-center w-full justify-center gap-3">
//             <div className="bg-red-300 px-3 rounded-md" onClick={handleYesClick}>
//               <p className="text-headingColor text-sm">Yes</p>
//             </div>
//             <div className="bg-green-300 px-3 rounded-md" onClick={handleNoClick}>
//               <p className="text-headingColor text-sm">No</p>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default ArtistCard;
