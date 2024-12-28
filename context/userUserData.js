// import { useUser } from "@auth0/nextjs-auth0/client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export const useUserData = () => {
//   const { user, isLoading } = useUser();
//   const [userDetails, setUserDetails] = useState(() => {
//     // Try to load from localStorage on initial mount
//     const savedData = localStorage.getItem("userData");
//     return savedData ? JSON.parse(savedData) : null;
//   });

//   // Fetch user data when component mounts or user changes
//   useEffect(() => {
//     if (user && !isLoading) {
//       fetchUserDetails();
//     }
//   }, [user]);

//   // Save to localStorage whenever userDetails changes
//   useEffect(() => {
//     if (userDetails) {
//       localStorage.setItem("userData", JSON.stringify(userDetails));
//     }
//   }, [userDetails]);

//   const fetchUserDetails = async () => {
//     if (!user) return;

//     try {
//       const res = await axios.get(`/api/user/${user.sub}`);
//       setUserDetails(res.data);
//     } catch (error) {
//       console.error("Error in fetchUserDetails", error);
//       // Try to load from localStorage as fallback
//       const savedData = localStorage.getItem("userData");
//       if (savedData) {
//         setUserDetails(JSON.parse(savedData));
//       }
//     }
//   };

//   const performAction = async (userId, pokemon, action) => {
//     try {
//       setUserDetails((prev) => {
//         const defaultState = { bookmarks: [], liked: [] };
//         prev = prev || defaultState;

//         const updatedBookmarks =
//           action === "bookmark"
//             ? prev.bookmarks.includes(pokemon)
//               ? prev.bookmarks.filter((p) => p !== pokemon)
//               : [...prev.bookmarks, pokemon]
//             : prev.bookmarks;

//         const updatedLikes =
//           action === "like"
//             ? prev.liked.includes(pokemon)
//               ? prev.liked.filter((p) => p !== pokemon)
//               : [...prev.liked, pokemon]
//             : prev.liked;

//         const newState = {
//           ...prev,
//           bookmarks: updatedBookmarks,
//           liked: updatedLikes,
//         };

//         // Save to localStorage immediately after state update
//         localStorage.setItem("userData", JSON.stringify(newState));
//         return newState;
//       });

//       // Sync with backend
//       await axios.post("/api/pokemon", {
//         userId,
//         pokemon,
//         action,
//       });
//     } catch (error) {
//       console.error("Error in performAction", error);
//       await fetchUserDetails(userId);
//     }
//   };

//   const clearUserData = () => {
//     localStorage.removeItem("userData");
//     setUserDetails(null);
//   };

//   return {
//     userDetails,
//     performAction,
//     fetchUserDetails,
//     clearUserData,
//     isLoading,
//   };
// };
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { useState } from "react";

export const useUserData = () => {
  const { user } = useUser();

  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    if (!user) return;

    try {
      const res = await axios.get(`/api/user/${user.sub}`);
      setUserDetails(res.data);
    } catch (error) {
      console.log("Error in fetchUserDetails", error);
    }
  };

  // const performAction = async (userId, pokemon, action) => {
  //   try {
  //     setUserDetails((prev) => {
  //       const updatedBookmarks =
  //         action === "bookmark"
  //           ? prev.bookmarks.includes(pokemon) // Is it already bookmarked?
  //             ? prev.bookmarks.filter((p) => p !== pokemon) // if yes then remove it
  //             : [...prev.bookmarks, pokemon] // if no then add it
  //           : prev.bookmarks; // no change in bookmarks

  //       const updatedLikes =
  //         action === "like"
  //           ? prev.liked.includes(pokemon) // Is it already liked?
  //             ? prev.liked.filter((p) => p !== pokemon) // if yes then remove it
  //             : [...prev.liked, pokemon] // if no then add it
  //           : prev.liked; // no change in likes

  //       return {
  //         ...prev,
  //         bookmarks: updatedBookmarks,
  //         liked: updatedLikes,
  //       };
  //     });

  //     await axios.post("/api/pokemon", {
  //       userId,
  //       pokemon,
  //       action,
  //     });
  //   } catch (error) {
  //     console.log("Error in performAction", error);
  //     fetchUserDetails(userId); // when error, fetch the user details again
  //   }
  // };
  const performAction = async (userId, pokemon, action) => {
    try {
      setUserDetails((prev) => {
        // Ensure prev is not null and has default values
        const defaultState = { bookmarks: [], liked: [] };
        prev = prev || defaultState;

        const updatedBookmarks =
          action === "bookmark"
            ? prev.bookmarks.includes(pokemon) // Is it already bookmarked?
              ? prev.bookmarks.filter((p) => p !== pokemon) // if yes, remove it
              : [...prev.bookmarks, pokemon] // if no, add it
            : prev.bookmarks; // no change in bookmarks

        const updatedLikes =
          action === "like"
            ? prev.liked.includes(pokemon) // Is it already liked?
              ? prev.liked.filter((p) => p !== pokemon) // if yes, remove it
              : [...prev.liked, pokemon] // if no, add it
            : prev.liked; // no change in likes

        return {
          ...prev,
          bookmarks: updatedBookmarks,
          liked: updatedLikes,
        };
      });

      // Sync with the backend
      await axios.post("/api/pokemon", {
        userId,
        pokemon,
        action,
      });
    } catch (error) {
      console.error("Error in performAction", error);
      await fetchUserDetails(userId); // Fetch user details again on error
    }
  };

  return { userDetails, performAction, fetchUserDetails };
};
