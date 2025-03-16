// tạo items
let images = document.querySelectorAll(".img");
const num = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let score = 0;
num.sort(() => Math.random() - 0.5);
console.log(num);

function replaceBG() {
  images.forEach((img) => {
    if (img.classList.contains("checked")) {
      //nếu hình giong nhau thi thay background white
      img.src = "./assets/white.png";
    } else {
      // thay background hình - random
      img.src = "./assets/background.png";
    }
    return img;
  });
  return images;
}
replaceBG();

let correct = [];
let activeImg = [];
let clickTime = 0;

// add event click
images.forEach((item) => {
  item.addEventListener("click", () => {
    clickTime++;
    // console.log(clickTime);
    item.classList.toggle("active");

    // thay background thành hình - random
    if (item.classList.contains("active")) {
      activeImg.push(item);
      item.src = `./assets/img_${num[item.id - 1]}.png`;
    }
    console.log(activeImg);

    // check neu dang mo 2 hinh thi check xem co 2 hinh giong nhau khong
    if (activeImg.length == 2) {
      if (activeImg[0].src == activeImg[1].src) {
        for (let i = 0; i < activeImg.length; i++) {
          correct.push(activeImg[i]);
        }

        console.log(correct);
        activeImg = [];
        clickTime = 0;
        clearTimeout(cooldown);
        score++;
        document.querySelector(".score").innerHTML = score;

        correct.forEach((item) => {
          item.classList.remove("active");
          item.classList.add("checked");
          // await(2000);
          replaceBG();
        });
      } else {
        var cooldown = setTimeout(() => {
          activeImg = [];
          clickTime = 0;
          activeImg.forEach((item) => {
            item.classList.remove("active");
          });
          replaceBG();
          activeImg = [];
        }, 2000);
      }
    }

    // số hình giong nhau là 12 (correct.length)thì reset
    if (correct.length == num.length) {
      const reset = document.createElement("button");
      reset.classList.add("reset");
      reset.innerHTML = "Reset";
      document.body.appendChild(reset);
      alert("Bạn đã thắng!");
      reset.addEventListener("click", () => {
        location.reload();
      });
    }
  });
});
