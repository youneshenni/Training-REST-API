let users = [];

const deleteListener = (id) =>
  fetch(`http://localhost:3000/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.status === 204) {
      const index = users.findIndex((user) => user.id == id);
      users.splice(index, 1);
      const li = document.getElementById(id);
      li.parentNode.removeChild(li);
    }
  });

const addUser = (name, email, id) => {
  const li = document.createElement("li");
  li.id = id;
  const button1 = document.createElement("button");
  const button2 = document.createElement("button");
  const text1 = document.createTextNode("Edit");
  const text2 = document.createTextNode("Delete");
  button1.appendChild(text1);
  button2.appendChild(text2);
  button2.addEventListener("click", () => deleteListener(id));
  const text = document.createElement("p");
  text.appendChild(document.createTextNode(`${name} - ${email}`));
  li.appendChild(text);
  li.appendChild(button1);
  li.appendChild(button2);
  document.getElementById("userslist").appendChild(li);
  button1.addEventListener("click", () => {
    createForm(id);
    document.getElementById("input1").value = name;
    document.getElementById("input2").value = email;
  });
};

fetch("http://localhost:3000")
  .then((res) => res.json())
  .then((data) => {
    users = data;
    data.map(({ name, email, id }) => addUser(name, email, id));
  });

const createForm = (id) => {
  if (document.getElementById("form").children.length === 0) {
    const form = document.createElement("form");
    form.id = "insertForm";
    const label1 = document.createElement("label");
    label1.appendChild(document.createTextNode("Name: "));
    const input1 = document.createElement("input");
    input1.id = "input1";
    const label2 = document.createElement("label");
    label2.appendChild(document.createTextNode("Email: "));
    const input2 = document.createElement("input");
    input2.id = "input2";
    const button = document.createElement("button");
    const text = document.createTextNode("Create");
    button.appendChild(text);
    form.appendChild(label1);
    form.appendChild(input1);
    form.appendChild(label2);
    form.appendChild(input2);
    form.appendChild(button);
    document.getElementById("form").appendChild(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = input1.value;
      const email = input2.value;
      fetch("http://localhost:3000" + `/${id}` || "", {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }).then((res) => {
        if (res.status === 201) {
          if (!id) addUser(name, email, users.slice(-1)[0].id + 1);
          else {
            const userElement = document.getElementById(id);
            console.log(userElement.children[0]);
            userElement.children[0].textContent = `${name} - ${email}`;
          }
        }
      });
    });
  }
};

document
  .getElementById("new")
  .addEventListener("click", () => createForm("insert"));
