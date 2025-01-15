// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

document.getElementById("uvForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const uvResult = document.getElementById("uvResult");
  const loading = uvResult.querySelector(".loading");
  const resultContent = uvResult.querySelector(".result-content");
  const submitButton = document.getElementById("submitButton");
  const location = document.getElementById("locationInput").value;
  const apiKeyGeo = "5beb59dead6af57bc9e4d6e9bf4f00c2";
  const apiKeyUV = "openuv-3pywdrm0gqiopi-io";

  // Show loading state
  uvResult.style.display = "block";
  loading.style.display = "block";
  resultContent.style.display = "none";
  submitButton.disabled = true;

  try {
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKeyGeo}`
    );
    const geoData = await geoResponse.json();
    if (geoData.length === 0)
      throw new Error("Location not found. Please try again.");

    const { lat, lon } = geoData[0];

    const uvResponse = await fetch(
      `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
      {
        headers: {
          "x-access-token": apiKeyUV,
        },
      }
    );
    const uvData = await uvResponse.json();
    const uvIndex = uvData.result.uv;

    // Determine risk level and class
    let riskLevel, riskClass;
    if (uvIndex < 3) {
      riskLevel = "Low";
      riskClass = "risk-low";
    } else if (uvIndex < 6) {
      riskLevel = "Moderate";
      riskClass = "risk-moderate";
    } else if (uvIndex < 8) {
      riskLevel = "High";
      riskClass = "risk-high";
    } else if (uvIndex < 11) {
      riskLevel = "Very High";
      riskClass = "risk-very-high";
    } else {
      riskLevel = "Extreme";
      riskClass = "risk-extreme";
    }

    resultContent.innerHTML = `
        <h2>UV Index for ${location}</h2>
        <p>Current UV Index: <strong>${uvIndex.toFixed(1)}</strong></p>
        <p>Risk Level: <strong class="${riskClass}">${riskLevel}</strong></p>
        <div class="mt-4">
          <small class="text-muted">Last updated: ${new Date().toLocaleString()}</small>
        </div>
      `;
  } catch (error) {
    resultContent.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Error</h4>
          <p>${error.message}</p>
        </div>
      `;
  } finally {
    // Hide loading state
    loading.style.display = "none";
    resultContent.style.display = "block";
    submitButton.disabled = false;
  }
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});
