// navbar.js
const navbar = `
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="logo">Todo & Expense Tracker</a>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="signup.html">Signup</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="todo.html">Todo</a></li>
        <li><a href="expense.html">Expense Tracker</a></li>
      </ul>
    </div>
  </nav>
`;

document.getElementById('navbar').innerHTML = navbar;
