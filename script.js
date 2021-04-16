window.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".form-check");
  const blockContent = document.querySelector(".menu-options__block");
  const data = {};
  forms.forEach((form, index) => {
    const dataForm = form.dataset.item;
    let content = "";
    data[dataForm] = [];
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.onchange = function () {
        const value = input.value;
        const arrow = document.querySelectorAll(".list-item")[index];
        if (
          (input.type == "checkbox" && input.checked === false) ||
          input.value === ""
        ) {
          const indexRemove = data[dataForm].indexOf(value);
          data[dataForm].splice(indexRemove, 1);
          if (data[dataForm].length == 0) {
            arrow.classList.remove("decor");
          }
        } else if (input.value != "" || input.checked === true) {
          arrow.classList.add("decor");

          if (dataForm === "diameter") {
            data[dataForm] = [];
            data[dataForm].push(value);
          } else {
            data[dataForm].push(value);
          }
        }

        content = "";
        for (let key in data) {
          if (key === "diameter" && data[key].length !== 0) {
            if (+data.diameter >= 4 && +data.diameter <= 98) {
              content = "Диаметр " + data[key] + ",";
              console.log('добавление')
            } else {
              input.value = "";
              console.log('сброс')
            }
          } else {
            content += data[key] + " ";
          }
        }
        if (content != "    ") {
          blockContent.textContent = content.split(",").join(", ");
          blockContent.style.color = "#898989";
        } else {
          blockContent.textContent = "Выберите нужные параметры";
          blockContent.style.color = "#3d3d3d";
        }
      };
    });
  });
});
