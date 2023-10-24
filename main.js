var map;
      window.addEventListener("load", async () => {
        await getLocation();
      });
      async function getLocation() {
        let ip = document.querySelector("input").value;
        try {
          let res = await fetch(`https://ipapi.co/${ip}/json`);
          let data = await res.json();
          if (data.error) {
            document.querySelector(".error").innerHTML += data.reason;
            document.querySelector(".error").style.display = "block";
            return;
          } else {
            document.querySelector(".error").style.display = "none";
            if (map != undefined) {
              map.remove();
            }
            document.querySelector(".ip").innerHTML = data.ip;
            document.querySelector(
              ".location"
            ).innerHTML = `${data.region}, ${data.country}`;
            document.querySelector(".timezone").innerHTML = data.timezone;
            document.querySelector(".isp").innerHTML = data.org;

            map = L.map("map").setView([data.latitude, data.longitude], 13);
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);
            var marker = L.marker([data.latitude, data.longitude]).addTo(map);
          }
        } catch (err) {
          document.querySelector(".error").innerHTML = err;
          document.querySelector(".error").style.display = "block";
        }
      }