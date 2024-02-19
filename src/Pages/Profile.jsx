import React, { useState,useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { CiMenuKebab, CiLocationOn } from "react-icons/ci";
import { IoMdLink } from "react-icons/io";
import { FaW, FaWhatsapp } from "react-icons/fa6";
import face1 from "../assets/images/person.svg";
import bg from "../assets/images/bg.jpg";
import { useGlobal } from "../context";
import { LuMail } from "react-icons/lu";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { FaLinkedin } from "react-icons/fa6";
import Nav from "../Components/Nav";
import EditProfile from "./EditProfile";
function Profile() {
  const { setPage, userDetails, localData, setImg, img } = useGlobal();
  const photoURL = img.img || face1;
  const [log, setLog] = useState();
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Check if the document with the given ID exists
        const postsCollection = collection(db, "courses");
        const postsQuery = query(postsCollection, where("id", "==", localData.id));
        const querySnapshot = await getDocs(postsQuery);

        if (!querySnapshot.empty) {
          // If posts exist, set posts data in state
          const postsData = querySnapshot.docs.map((doc) => doc.data());
          setPosts(postsData);
          // console.log(posts)
        } else {
          // If posts don't exist, set posts data to empty array
          console.log("No posts found");
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error.message);
      }
    };

    // Fetch existing user data when the component mounts
    fetchPosts();
  }, []); 

  return (
    <div className="min-h-screen w-screen bg-black">
      {/* Banner */}
      <div className="w-full flex relative   justify-between items-start px-3 py-0 bg-gray-800 h-[100px] ">
        <BsArrowLeft
          onClick={() => {
            setPage("home");
          }}
          className="text-black mt-2 z-40 "
          size={30}
        />
        <CiMenuKebab
          className="text-black mt-2 z-40"
          onClick={() => {
            setLog(!log);
          }}
          size={25}
        />
        <img
          className="absolute w-full h-full right-0 object-fill sm:object-cover  "
          src={bg}
          alt=""
        />
        {log && (
          <div
            onClick={() => {
              setPage("board1");
              localStorage.removeItem("isSignedIn");
              localStorage.removeItem("userDetails");
            }}
            className="absolute bottom-4 right-4 bg-black px-4 py-2 rounded-[8px] "
          >
            Log Out
          </div>
        )}
      </div>

      <div className="relative  flex flex-col px-3  w-screen ">
        <img
          src={localData.img}
          className="-top-4 border-[3px] border-black h-[50px] w-[50px] rounded-[50%] absolute"
          alt=""
        />
        <button
          onClick={() => {
            setPage("edit");
          }}
          className="border-[2px] sm:absolute sm:right-40 hover:border-white hover:font-[600] font-[500] border-gray-700 px-[15px] py-1  absolute right-6 top-3 rounded-[20px] "
        >
          Edit profile
        </button>
        <p className=" mt-12  text-[20px] font-bold">{img.name}</p>
      </div>
      {/* details/description */}
      <div className="px-4 mt-2">
        {/* desc */}
        <p className="font-[500]">{localData.description}</p>
        {/* details */}
        <div className="flex w-full mt-4 font-500 text-[16px] justify-start text-gray-300 gap-2 items-center ">
          {/* location */}
          <p className="flex gap-1 items-center justify-center  ">
            {" "}
            <CiLocationOn size={20} />
            Babcock, Ogun
          </p>
          {/* link */}
          <p className="flex items-center  gap-1">
            {" "}
            <IoMdLink size={21} />{" "}
            <span className="text-blue-400 flex gap-1">
              <a href={`https://wa.me/${localData.whatsapp}`}>
                <FaWhatsapp size={20} />
              </a>
              <a href={localData.linkedin}>
                <FaLinkedin size={20} />
              </a>

              <a href={`mailto:${localData.email}`}>
                <LuMail size={20} />
              </a>
            </span>
          </p>
        </div>
      </div>
      {/* items */}
      <div className="w-full sm:flex-row sm:gap-8 sm:w-full  flex mb-40  items-center justify-center gap-4  my-8 px flex-col">
        {/* Logs through posts */}
        {posts.map((post, id) => {
          return (
            <div
              key={id}
              className="bg-gray-700 relative sm:w-[300px] w-[90%]  h-[300px] "
            >
              <img
                src={post.image}
                className="absolute h-full w-full top-0 left-0"
                alt=""
              />
              <section className="px-4 w-full rounded-b-[0px] bg-opacity-30 card py-3 absolute bottom-0 ">
                <h4 className="font-bold   text-[20px] ">{post.author}</h4>
                <p>{post.title}</p>
              </section>
            </div>
          );
        })}
      </div>

      <Nav />
    </div>
  );
}

export default Profile;
