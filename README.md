# Authentication_and_Encryption

# Authentication

<ul>
<li>The main idea of this project is to simulate the authentication and encryption of user’s password.</li>
<li>Authentication is the process of recognizing a user’s identity. It is the mechanism of associating an incoming request with a set of identifying credentials. </li>
<li>The credentials provided are compared to those on a file in a database of the authorized user’s information on a local operating system or within an authentication server.</li>
<li>The registered users are the only one, who can access the resources which are present in the website.</li>
<li>The second main part of this project is, the website won’t save the user’s plain password in the database. It stores the encrypted password in the database.</li>
<li>In this way, we are enhancing the security of user’s password.</li>
</ul>

# Encryption

<ul>
<li>In this project, we are encrypting the user’s password using a built in npm package called Bcrypt.</li>
<li>This package encrypts the user’s password by using Hashing & Salting methods.</li>
<li>Normally hash is generated when ever we pass a password into a hash function.</li>
<li>But here to make the password even more secure, we are salting the password and passing into a hash function to generate a hash.</li>
<li>In this package, we have one more parameter called salt Rounds. Basically if the value of this salt Rounds is 10. That means the algorithm runs for ten(10) rounds.</li>
<li>By doing this, we are making this algorithm even more stronger.</li>
<li>That’s why, it is very difficult to crack this encrypted password.</li>
</ul>
<br>
![image](https://user-images.githubusercontent.com/62476583/116648501-d21b6300-a99a-11eb-93df-f9d50b974e90.png)
<br>

# Work Flow

The general workflow for account registration and authentication in a hash-based account system is as follows:<br>
<ol>
  <li>The user creates an account.</li>
  <li>Their password is hashed and stored in the database. At no point is the plain-text (unencrypted) password ever written to the hard drive.</li>
  <li>When the user attempts to login, the hash of the password they entered is checked against the hash of their real password (retrieved from the database).</li>
  <li>If the hashes match, the user is granted access. If not, the user is told they entered invalid login credentials.</li>
  <li>Steps 3 and 4 repeat every time someone tries to login to their account.</li>
</ol>
