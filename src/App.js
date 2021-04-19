import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [locationsData, setLocation] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    axios
      .get("https://test-themarche.themarche.ca/api/MenuData/GetLocations")
      .then((response) => {
        let res = JSON.parse(response.data.result);
        setLocation(res["LocationsData"][0]["StatesCode"]);
        console.log(res["LocationsData"][0]["StatesCode"]);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://test-themarche.themarche.ca/api/MenuData/GetMenu")
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
    if (locationsData && categoryData) buildArray(1);
  }, [locationsData, categoryData]);

  const buildArray = (locationId) => {
    const items = [];
    locationsData.map((el) => {
      if (el.StateId != locationId) return null;

      let locationPath = el.StateName.replace(/[\W_]+/g, " ")
        .trim()
        .replace(/ /g, "-");

      items.push({
        url: `https://themarche.ca/Listings/${locationPath}`,
        locationPath,
        catPath: "",
        location: el.StateName,
        category: "",
        id: "",
      });

      for (let cat of categoryData) {
        let catPath = cat.CategoryName.replace(/[\W_]+/g, " ")
          .trim()
          .replace(/ /g, "-");

        items.push({
          url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
          locationPath,
          catPath,
          location: el.StateName,
          category: cat.CategoryName,
          id: cat.CategoryId,
        });

        for (let cat2 of cat.Level_CTE2) {
          catPath =
            cat.CategoryName.replace(/[\W_]+/g, " ")
              .trim()
              .replace(/ /g, "-") +
            "/" +
            cat2.CategoryName1.replace(/[\W_]+/g, " ")
              .trim()
              .replace(/ /g, "-");

          items.push({
            url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
            locationPath,
            catPath,
            location: el.StateName,
            category: cat2.CategoryName1,

            subId: cat2.CategoryId1,
            id: cat.CategoryId,
          });

          for (let cat3 of cat2.Level_CTE3) {
            if (!cat3.CategoryId2) continue;
            catPath =
              cat.CategoryName.replace(/[\W_]+/g, " ")
                .trim()
                .replace(/ /g, "-") +
              "/" +
              cat2.CategoryName1.replace(/[\W_]+/g, " ")
                .trim()
                .replace(/ /g, "-") +
              "/" +
              cat3.CategoryName2.replace(/[\W_]+/g, " ")
                .trim()
                .replace(/ /g, "-");

            items.push({
              location: el.StateName,
              category: cat3.CategoryName2,
              subId: cat3.CityAreaId,
              id: cat.CategoryId,
              url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
              locationPath,
              catPath,
            });
          }
        }

        // Location level 2
        for (let el2 of el.CityCode) {
          locationPath =
            el.StateName.replace(/[\W_]+/g, " ")
              .trim()
              .replace(/ /g, "-") +
            "/" +
            el2.CityName.replace(/[\W_]+/g, " ")
              .trim()
              .replace(/ /g, "-");

          items.push({
            location: el2.CityName,
            category: "",
            id: "",
            url: `https://themarche.ca/Listings/${locationPath}`,
            locationPath,
            catPath: "",
          });
          for (let cat of categoryData) {
            let catPath = cat.CategoryName.replace(/[\W_]+/g, " ")
              .trim()
              .replace(/ /g, "-");

            items.push({
              location: el2.CityName,
              category: cat.CategoryName,
              id: cat.CategoryId,
              url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
              locationPath,
              catPath,
            });

            for (let cat2 of cat.Level_CTE2) {
              catPath =
                cat.CategoryName.replace(/[\W_]+/g, " ")
                  .trim()
                  .replace(/ /g, "-") +
                "/" +
                cat2.CategoryName1.replace(/[\W_]+/g, " ")
                  .trim()
                  .replace(/ /g, "-");

              items.push({
                location: el2.CityName,
                category: cat2.CategoryName1,
                subId: cat2.CategoryId1,
                id: cat.CategoryId,
                url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
                locationPath,
                catPath,
              });

              for (let cat3 of cat2.Level_CTE3) {
                if (!cat3.CategoryId2) continue;
                catPath =
                  cat.CategoryName.replace(/[\W_]+/g, " ")
                    .trim()
                    .replace(/ /g, "-") +
                  "/" +
                  cat2.CategoryName1.replace(/[\W_]+/g, " ")
                    .trim()
                    .replace(/ /g, "-") +
                  "/" +
                  cat3.CategoryName2.replace(/[\W_]+/g, " ")
                    .trim()
                    .replace(/ /g, "-");

                items.push({
                  location: el2.CityName,
                  category: cat3.CategoryName2,
                  id: cat.CategoryId,
                  url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
                  locationPath,
                  catPath,
                });
              }
            }
          }

          //Location level 3
          for (let el3 of el2.CityAreaCode) {
            if (!el3.CityAreaId) continue;
            locationPath =
              el.StateName.replace(/[\W_]+/g, " ")
                .trim()
                .replace(/ /g, "-") +
              "/" +
              el2.CityName.replace(/[\W_]+/g, " ")
                .trim()
                .replace(/ /g, "-") +
              el3.CityAreaName.replace(/[\W_]+/g, " ")
                .trim()
                .replace(/ /g, "-");

            items.push({
              location: el3.CityAreaName,
              category: "",
              id: "",
              url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
              locationPath,
              catPath: "",
            });

            for (let cat of categoryData) {
              let catPath = cat.CategoryName.replace(/[\W_]+/g, " ")
                .trim()
                .replace(/ /g, "-");

              items.push({
                location: el3.CityAreaName,
                category: cat.CategoryName,
                id: cat.CategoryId,
                url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
                locationPath,
                catPath,
              });

              for (let cat2 of cat.Level_CTE2) {
                catPath =
                  cat.CategoryName.replace(/[\W_]+/g, " ")
                    .trim()
                    .replace(/ /g, "-") +
                  "/" +
                  cat2.CategoryName1.replace(/[\W_]+/g, " ")
                    .trim()
                    .replace(/ /g, "-");

                items.push({
                  location: el3.CityAreaName,
                  category: cat2.CategoryName1,
                  subId: cat2.CategoryId1,
                  id: cat.CategoryId,
                  url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
                  locationPath,
                  catPath,
                });

                for (let cat3 of cat2.Level_CTE3) {
                  if (!cat3.CategoryId2) continue;

                  catPath =
                    cat.CategoryName.replace(/[\W_]+/g, " ")
                      .trim()
                      .replace(/ /g, "-") +
                    "/" +
                    cat2.CategoryName1.replace(/[\W_]+/g, " ")
                      .trim()
                      .replace(/ /g, "-") +
                    "/" +
                    cat3.CategoryName2.replace(/[\W_]+/g, " ")
                      .trim()
                      .replace(/ /g, "-");

                  items.push({
                    location: el3.CityAreaName,
                    category: cat3.CategoryName2,
                    id: cat.CategoryId,
                    url: `https://themarche.ca/Listings/${locationPath}/${catPath}`,
                    locationPath,
                    catPath,
                  });
                }
              }
            }
          }
        }
      }

      setItems(items);
    });
  };

  return (
    <div>
      <h3>Choose Location</h3>
      <select onChange={(e) => buildArray(e.target.value)}>
        {locationsData
          ? locationsData.map((el) => {
              return <option value={el.StateId}>{el.StateName}</option>;
            })
          : null}
      </select>
      <br />

      <table className="table">
        <tr className="tableHead">
          <th>
            <h2>Count</h2>
          </th>
          <th>
            <h2>URLs</h2>
          </th>
          <th>
            <h2>Page Title</h2>
          </th>
          <th>
            <h2>Location</h2>
          </th>
          <th>
            <h2>Category</h2>
          </th>
        </tr>

        {items
          ? items.map((e, i) => {
              let title;
              if (e.id === 3152) {
                title = `Hire or Find Jobs about ${e.category} in ${e.location}, Canada (2021) - Marche Classifieds`;
              } else if (e.id === 3149) {
                title = `Find and Advertise ${e.category} in ${e.location}, Canada (2021) - Marche Classifieds`;
              } else if (e.id === 3194) {
                title = `Adopt or Find ${e.category} in ${e.location}, Canada (2021) - Marche Classifieds`;
              } else if (e.id === 3613) {
                title = `Sharing Room or House in ${e.category} with marche Stays, (2021) - Marche Classifieds`;
              } else if (e.id === 3153 && !e.subId) {
                title = `Find ${e.category} in ${e.location}, Canada (2021) - Marche Classifieds`;
              } else if (e.id === 3153 && e.subId) {
                title = `Find Community or Service of ${e.category} in ${e.location}, Canada (2021) - Marche Classifieds`;
              } else if (e.id === 3153 && e.subId) {
                title = `Explore many ${e.category} in ${e.location}, Canada (2021) - Marche Classifieds`;
              } else {
                title = `Buy and Sell ${e.category} in ${e.location}, Canada New/Used (2021) - Marche Classifieds`;
              }

              if (e.id === 3153) console.log(e);

              return (
                <tr className="tableRow">
                  <th>{i + 1}</th>
                  <th>{e.url}</th>
                  {/* <th>{`Buy and Sell ${e.catPath
                  .split("/")
                  [e.catPath.split("/").length - 1].split("-")
                  .join(" ")} in ${e.locationPath
                  .split("/")
                  [e.locationPath.split("/").length - 1].split("-")
                  .join(" ")}, Canada (2021) - Marche Classifieds`}</th> */}
                  <th>{title}</th>
                  <th>{e.locationPath}</th>
                  <th>{e.catPath}</th>
                </tr>
              );
            })
          : null}
      </table>
    </div>
  );
}

export default App;
