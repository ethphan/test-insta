import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const config = {
  redirecURI: "https://test-insta-login.netlify.app/",
  clientId: "704688546872217",
  clientSecret: "eaa76d9597e1b2ae7c26ac5f49cac8ff",
};

function App() {
  const [instaToken, setInstaToken] = useState(null);
  const [instaUserId, setInstaUserId] = useState(null);
  const [instaUserName, setInstaUserName] = useState(null);
  const [instaEmail, setInstaEmail] = useState(null);
  const [instaAvt, setInstaAvt] = useState(null);
  const [showInstaLoginModal, setShowInstaLoginModal] = useState(false);

  const [locationsData, setLocation] = useState(false);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    axios
      .get("https://themarche.ca:3100/api/MenuData/GetLocations")
      .then((response) => {
        let res = JSON.parse(response.data.result);
        setLocation(res["LocationsData"][0]["StatesCode"]);
        console.log(res["LocationsData"][0]["StatesCode"]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://themarche.ca:3100/api/MenuData/GetMenu")
      .then((response) => {
        let res = JSON.parse(response.data.result);
        setCategoryData(res["MenuData"]);
        console.log(res["MenuData"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (locationsData && categoryData) {
      // for (let el of locationsData) {
      //   if (el.StateId !== 1) continue;
      //   console.log(
      //     `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //       .trim()
      //       .replace(/ /g, "-")}`
      //   );
      //   for (let cat of categoryData) {
      //     console.log(
      //       `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //         .trim()
      //         .replace(/ /g, "-")}/${cat.CategoryName.replace(/[\W_]+/g, " ")
      //         .trim()
      //         .replace(/ /g, "-")}`
      //     );
      //     for (let cat2 of cat.Level_CTE2) {
      //       console.log(
      //         `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //           .trim()
      //           .replace(/ /g, "-")}/${cat2.CategoryName1.replace(/[\W_]+/g, " ")
      //           .trim()
      //           .replace(/ /g, "-")}`
      //       );
      //       for (let cat3 of cat2.Level_CTE3) {
      //         if (!cat3.CategoryId2) continue;
      //         console.log(
      //           `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-")}/${cat3.CategoryName2.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-")}`
      //         );
      //       }
      //     }
      //   }
      // Location level 2
      // for (let el2 of el.CityCode) {
      //   console.log(
      //     `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //       .trim()
      //       .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
      //       .trim()
      //       .replace(/ /g, "-")}`
      //   );
      //   for (let cat of categoryData) {
      //     let catPath = cat.CategoryName.replace(/[\W_]+/g, " ")
      //       .trim()
      //       .replace(/ /g, "-");
      //     console.log(
      //       `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //         .trim()
      //         .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
      //         .trim()
      //         .replace(/ /g, "-")}/${catPath}`
      //     );
      //     for (let cat2 of cat.Level_CTE2) {
      //       catPath =
      //         cat.CategoryName.replace(/[\W_]+/g, " ") +
      //         "/" +
      //         cat2.CategoryName1.replace(/[\W_]+/g, " ")
      //           .trim()
      //           .replace(/ /g, "-");
      //       console.log(
      //         `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //           .trim()
      //           .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
      //           .trim()
      //           .replace(/ /g, "-")}/${catPath}`
      //       );
      //       for (let cat3 of cat2.Level_CTE3) {
      //         if (!cat3.CategoryId2) continue;
      //         catPath =
      //           cat.CategoryName.replace(/[\W_]+/g, " ") +
      //           "/" +
      //           cat2.CategoryName1.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-") +
      //           "/" +
      //           cat3.CategoryName2.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-");
      //         console.log(
      //           `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-")}/${catPath}`
      //         );
      //       }
      //     }
      //   }
      //Location level 3
      // for (let el3 of el2.CityAreaCode) {
      //   if (!el3.CityAreaId) continue;
      //   console.log(
      //     `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //       .trim()
      //       .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
      //       .trim()
      //       .replace(/ /g, "-")}/${el3.CityAreaName.replace(/[\W_]+/g, " ")
      //       .trim()
      //       .replace(/ /g, "-")}`
      //   );
      //   for (let cat of categoryData) {
      //     console.log(
      //       `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //         .trim()
      //         .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
      //         .trim()
      //         .replace(/ /g, "-")}/${el3.CityAreaName.replace(/[\W_]+/g, " ")
      //         .trim()
      //         .replace(/ /g, "-")}/${cat.CategoryName.replace(/[\W_]+/g, " ")
      //         .trim()
      //         .replace(/ /g, "-")}`
      //     );
      //     for (let cat2 of cat.Level_CTE2) {
      //       console.log(
      //         `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //           .trim()
      //           .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
      //           .trim()
      //           .replace(/ /g, "-")}/${el3.CityAreaName.replace(/[\W_]+/g, " ")
      //           .trim()
      //           .replace(/ /g, "-")}/${cat2.CategoryName1.replace(/[\W_]+/g, " ")
      //           .trim()
      //           .replace(/ /g, "-")}`
      //       );
      //       for (let cat3 of cat2.Level_CTE3) {
      //         if (!cat3.CategoryId2) continue;
      //         console.log(
      //           `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-")}/${el3.CityAreaName.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-")}/${cat3.CategoryName2.replace(/[\W_]+/g, " ")
      //             .trim()
      //             .replace(/ /g, "-")}`
      //         );
      //       }
      //     }
      //   }
      // }
      //  }
      // }
    }
  }, [locationsData, categoryData]);

  const list =
    locationsData && categoryData
      ? locationsData.map((el) => {
          if (el.StateId !== 1) return null;
          const items = [];
          // let item = `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
          //   .trim()
          //   .replace(/ /g, "-")}`;

          items.push(
            `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
              .trim()
              .replace(/ /g, "-")}`
          );

          //   console.log(
          //     `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
          //       .trim()
          //       .replace(/ /g, "-")}`
          //   );

          for (let cat of categoryData) {
            items.push(
              `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                .trim()
                .replace(/ /g, "-")}/${cat.CategoryName.replace(/[\W_]+/g, " ")
                .trim()
                .replace(/ /g, "-")}`
            );
            for (let cat2 of cat.Level_CTE2) {
              items.push(
                `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                  .trim()
                  .replace(/ /g, "-")}/${cat.CategoryName.replace(/[\W_]+/g, " ")
                  .trim()
                  .replace(/ /g, "-")}/${cat2.CategoryName1.replace(/[\W_]+/g, " ")
                  .trim()
                  .replace(/ /g, "-")}`
              );

              for (let cat3 of cat2.Level_CTE3) {
                if (!cat3.CategoryId2) continue;
                items.push(
                  `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                    .trim()
                    .replace(/ /g, "-")}/${cat.CategoryName.replace(/[\W_]+/g, " ")
                    .trim()
                    .replace(/ /g, "-")}/${cat2.CategoryName1.replace(/[\W_]+/g, " ")
                    .trim()
                    .replace(/ /g, "-")}/${cat3.CategoryName2.replace(/[\W_]+/g, " ")
                    .trim()
                    .replace(/ /g, "-")}`
                );
              }
            }

            // Location level 2
            for (let el2 of el.CityCode) {
              // items.push(
              //   `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
              //     .trim()
              //     .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
              //     .trim()
              //     .replace(/ /g, "-")}`
              // );
              for (let cat of categoryData) {
                // let catPath = cat.CategoryName.replace(/[\W_]+/g, " ")
                //   .trim()
                //   .replace(/ /g, "-");
                // items.push(
                //   `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                //     .trim()
                //     .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
                //     .trim()
                //     .replace(/ /g, "-")}/${catPath}`
                // );
                for (let cat2 of cat.Level_CTE2) {
                  // catPath =
                  //   cat.CategoryName.replace(/[\W_]+/g, " ") +
                  //   "/" +
                  //   cat2.CategoryName1.replace(/[\W_]+/g, " ")
                  //     .trim()
                  //     .replace(/ /g, "-");

                  // items.push(
                  //   `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                  //     .trim()
                  //     .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
                  //     .trim()
                  //     .replace(/ /g, "-")}/${catPath}`
                  // );

                  for (let cat3 of cat2.Level_CTE3) {
                    // if (!cat3.CategoryId2) continue;
                    // catPath =
                    //   cat.CategoryName.replace(/[\W_]+/g, " ") +
                    //   "/" +
                    //   cat2.CategoryName1.replace(/[\W_]+/g, " ")
                    //     .trim()
                    //     .replace(/ /g, "-") +
                    //   "/" +
                    //   cat3.CategoryName2.replace(/[\W_]+/g, " ")
                    //     .trim()
                    //     .replace(/ /g, "-");
                    // items.push(
                    //   `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                    //     .trim()
                    //     .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
                    //     .trim()
                    //     .replace(/ /g, "-")}/${catPath}`
                    // );
                  }
                }
              }

              //Location level 3
              for (let el3 of el2.CityAreaCode) {
                if (!el3.CityAreaId) continue;
                // items.push(
                //   `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                //     .trim()
                //     .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
                //     .trim()
                //     .replace(/ /g, "-")}/${el3.CityAreaName.replace(/[\W_]+/g, " ")
                //     .trim()
                //     .replace(/ /g, "-")}`
                // );
                for (let cat of categoryData) {
                  // items.push(
                  //   `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                  //     .trim()
                  //     .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
                  //     .trim()
                  //     .replace(/ /g, "-")}/${el3.CityAreaName.replace(/[\W_]+/g, " ")
                  //     .trim()
                  //     .replace(/ /g, "-")}/${cat.CategoryName.replace(/[\W_]+/g, " ")
                  //     .trim()
                  //     .replace(/ /g, "-")}`
                  // );
                  for (let cat2 of cat.Level_CTE2) {
                    
                    // items.push(
                    //   `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                    //     .trim()
                    //     .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
                    //     .trim()
                    //     .replace(/ /g, "-")}/${el3.CityAreaName.replace(/[\W_]+/g, " ")
                    //     .trim()
                    //     .replace(/ /g, "-")}/${cat2.CategoryName1.replace(/[\W_]+/g, " ")
                    //     .trim()
                    //     .replace(/ /g, "-")}`
                    // );

                    for (let cat3 of cat2.Level_CTE3) {
                      if (!cat3.CategoryId2) continue;
                      // items.push(
                      //   `https://themarche.ca/Listings/${el.StateName.replace(/[\W_]+/g, " ")
                      //     .trim()
                      //     .replace(/ /g, "-")}/${el2.CityName.replace(/[\W_]+/g, " ")
                      //     .trim()
                      //     .replace(/ /g, "-")}/${el3.CityAreaName.replace(/[\W_]+/g, " ")
                      //     .trim()
                      //     .replace(/ /g, "-")}/${cat3.CategoryName2.replace(/[\W_]+/g, " ")
                      //     .trim()
                      //     .replace(/ /g, "-")}`
                      // );
                    }
                  }
                }
              }
            }
          }

          return (
            <ul>
              {items.map((e) => (
                <li>{e}</li>
              ))}
              {console.log(items.length)}
            </ul>
          );
        })
      : null;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);
    if (code) {
      console.log(code);

      let data = {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_SECRETE,
        grant_type: "authorization_code",
        redirect_uri: config.redirecURI,
        code,
      };

      console.log(data);
      let formData = new FormData();
      for (let key of Object.keys(data)) {
        console.log(data[key]);
        formData.append(key, data[key]);
      }
    }
  }, []);

  return (
    <div>
      <a href="/">
        <h2>Test Insta Login</h2>
      </a>
      <div className="instagramLoginButton">
        <a
          href={`https://api.instagram.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${config.redirecURI}&scope=user_profile,user_media&response_type=code`}
        >
          <button>
            <span>Sign in with Instagram</span>
          </button>
        </a>
      </div>
      {instaAvt ? <img src={instaAvt} alt="img" /> : null}
      {list}
    </div>
  );
}

export default App;
