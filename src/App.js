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

      console.log("https://api.instagram.com/oauth/access_token");

      // axios
      //   .post("/oauth/access_token", formData)
      //   .then((res) => {
      //     console.log(res);
      //     const { access_token, user_id } = res.data;
      //     setInstaToken(access_token);
      //     setInstaUserId(user_id);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      // (async () => {
      //   const rawResponse = await fetch("/oauth/access_token", {
      //     method: "POST",
      //     body: formData,
      //   });

      //   const content = await rawResponse.json();

      //   console.log(content);
      // })();

      // (async () => {
      //   const rawResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      //     method: "POST",
      //     body: formData,
      //   });
        
      //   const content = await rawResponse.json();

      //   console.log(content);
      // })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [window.location.href]);
  }, []);

  useEffect(() => {
    if (instaToken && instaUserId) {
      axios
        .get(`https://graph.instagram.com/me?fields=id,username&access_token=${instaToken}`)
        .then((res) => {
          const { username } = res.data;
          console.log(username);
          setInstaUserName(username);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [instaToken, instaUserId]);

  useEffect(() => {
    if (instaUserName) {
      axios
        .get(`https://www.instagram.com/${instaUserName}/?__a=1`)
        .then((res) => {
          console.log(res);
          const { profile_pic_url_hd } = res.data.graphql.user;

          console.log(profile_pic_url_hd);
          setInstaAvt(profile_pic_url_hd);
          showInstaLoginModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [instaUserName]);

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
    </div>
  );
}

export default App;
