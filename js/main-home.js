// Check if there's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  // Remove Active class from All Li
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active Class On Element
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}
// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval
let theBackgrounInterval;

// Check if there's Local Storage Background Option
let backgroundLocalItem = localStorage.getItem("background_option");
// Check if Random Background Local Storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove Active class from All Span
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Click On Toggle icon
document.querySelector(".toggle-settings .sett-i").onclick = function () {
  // Toggle Class fa-spin
  this.classList.toggle("fa-spin");

  //Toggle class opening on Settings Box
  document.querySelector(".settings-box").classList.toggle("opening");
};
// Switch Colors
const colorList = document.querySelectorAll(".colors-list li");
colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActiveClasses(e);
  });
});

// Switch Background Option
const randomBackgroundElement = document.querySelectorAll(
  ".random-background span"
);
randomBackgroundElement.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActiveClasses(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeimages();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(theBackgrounInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imgesArray = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
];
// Function To Randomize Images
function randomizeimages() {
  if (backgroundOption === true) {
    theBackgrounInterval = setInterval(() => {
      //Get Random Number
      let randomNumber = Math.floor(Math.random() * imgesArray.length);

      // Change Backgroud Image Url
      landingPage.style.backgroundImage =
        'url("image/' + imgesArray[randomNumber] + '")';
    }, 10000);
  }
}
randomizeimages();

//Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffestTop = ourSkills.offsetTop;
  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHieght = this.innerHeight;
  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop >= skillsOffestTop + skillsOuterHeight - windowHieght) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Elemet
    let overlay = document.createElement("div");
    //Add Class To Overlay
    overlay.className = "popup-overlay";
    // Append Overlay To The Body
    document.body.appendChild(overlay);
    // Create The Popup
    let popupBox = document.createElement("div");
    //Add Class To Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      //Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      // Append The Text To The Heading
      imgHeading.appendChild(imgText);
      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.src;
    // Add Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append The Popup Box To The Body
    document.body.appendChild(popupBox);
    // Create The Close Span
    let closeBtn = document.createElement("span");
    // Create The Close Button Text
    let closeBtnText = document.createTextNode("X");
    // Append Text To Close Button
    closeBtn.appendChild(closeBtnText);
    //Add Class To Close Button
    closeBtn.className = "close-Btn";
    // Add Close Button To The Popup Box
    popupBox.appendChild(closeBtn);
  });
});
// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-Btn") {
    // Remove The Current Popup
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Elemnets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrollToSmoothAnyWhere(elements) {
  elements.forEach((elementSmooth) => {
    elementSmooth.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSmoothAnyWhere(allBullets);
scrollToSmoothAnyWhere(allLinks);

// Handle Active Classes
function handleActiveClasses(even) {
  // Remove Active Class From All Childern
  even.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Active Class On Element Self
  even.target.classList.add("active");
}

// show and hide
let showspan = document.querySelectorAll(".show-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalItem = localStorage.getItem("bullets-option");

if (bulletsLocalItem !== null) {
  showspan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".show-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".show-option .no").classList.add("active");
  }
}

showspan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }

    handleActiveClasses(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets-option");
  // Reload Window
  // window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  // Toggle Class Menu-Active On Button
  this.classList.toggle("menu-active");

  // Toggle Class Open On Links
  tLinks.classList.toggle("opening");
};

// Click Anywhere Outside Menu And Toggle Butoon
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("opening")) {
      // Toggle Class Menu-Active On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class Open On Links
      tLinks.classList.toggle("opening");
    }
  }
});
// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
/* ********************************************************************************************** */
// class Thide {
//   e
//   constructor(e){
//     this.e = e
//   }

//   hideing() {
//     return this.e.style.display = "none";
//   }
// }
// let obj1 = new Thide(document.getElementById("chose-color"));
// obj1.hideing();



// function Thide(e) {
//   this.e = e;
//   this.hideing = function () {
//     return this.e.style.display = "none";
//   };
// }
// let obj1 = new Thide(document.getElementById("chose-color"));
// obj1.hideing();

// document.querySelector(".reset-options").ondblclick = function () {
//   // document.getElementById("chose-color").style.display = "none";
//   // hiding(document.getElementById("chose-color"));
//   let myfun = (e) => (e.style.display = "none");
//   myfun(document.getElementById("chose-color"));
//   // document.getElementById("chose-color").hiding();
// };

// $(".reset-options").dblclick(function () {
//   $("#chose-color").hide();
// });

// $("p").hover(function () {
//   $(this).css("color", "red")
// },function () {
//   $(this).css("color", "blue")
// });
