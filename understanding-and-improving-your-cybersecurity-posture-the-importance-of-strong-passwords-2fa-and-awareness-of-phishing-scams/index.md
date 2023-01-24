# Understanding and Improving Your Cybersecurity Posture in 2023: The Importance of strong Passwords, 2FA and Awareness of Phishing Scams


Cybersecurity is the practice of protecting internet-connected systems, including hardware, software, and data, from attack, damage, or unauthorized access. One aspect of cybersecurity is protecting personal information, such as passwords, account data but also your privacy. In this article, we revisit the basics in cyber security, as there are daily new attacks and ways hackers try to get personal data.

<!--more-->

# Password Strength
The strength of a password is determined by its complexity and length. A strong password should be at least 12 characters long and include a mix of uppercase and lowercase letters, numbers, and special characters. Passwords that are shorter or consist only of easily guessable information, such as "password" or "1234," are considered weak and easy to crack.

{{< image src="20230124140040.png" caption="." >}}

One tool that can be used to check the strength of a password is Have I Been Pwned ([HIBP](https://haveibeenpwned.com/)), a website that allows users to check if their email address or other personal information has been involved in a data breach.

> **Note**: If you want to verify if your email or password have been involved in a data breach you can check it using my [Python/REST script](https://github.com/segraef/Scripts/blob/main/Python/hibp.py) or my [tiny HIBQ web app](https://hibq.azurewebsites.net) I wrote using Python and Flask.

{{< image src="20230124114844.png" caption="***[Have I Been Qwned (HIBQ) web app](https://hibq.azurewebsites.net) input fields.*** ([HIBQ](https://hibq.azurewebsites.net))" >}}
<br>
{{< image src="20230124140244.png" caption="***[Have I Been Qwned (HIBQ) web app](https://hibq.azurewebsites.net) results page.*** ([HIBQ](https://hibq.azurewebsites.net))" >}}

# Cracking Time
The time it takes to crack a password depends on the complexity of the password and the resources available to the person trying to crack it. A simple, short password can be cracked almost instantly using a brute force attack, which involves guessing every possible combination of characters. A longer and more complex password, on the other hand, may take years to crack even with the use of specialized software and powerful computer processors.

## 2020 vs. 2022
{{< image src="20230123204345.png" >}}

{{< image src="20230123204716.png" caption="***Password tables comparing MD5 hashes from 2020 and 2022 cracked by an RTX 2080 GPU.*** ([Hive Systems](https://www.hivesystems.io/blog/are-your-passwords-in-the-green))" >}}


# Passphrase
One way to make a password stronger is to use a passphrase, which is a sequence of words or other text that is easy to remember but difficult for others to guess. Passphrases are often longer than traditional passwords, which makes them more resistant to cracking attempts.

{{< image src="20230123151729.png" caption=".">}}

# Brute Force Attacks
A brute force attack is a method used by hackers to gain access to a password or personal information by guessing every possible combination of characters. These attacks can be automated and use specialized software to quickly guess thousands or even millions of combinations in a short amount of time. While a simple and short password can be cracked almost instantly using a brute force attack, longer and more complex passwords may still take a significant amount of time to crack, even with the use of powerful computer processors. To defend against brute force attacks, it is important to use strong and complex passwords, and to use two-factor authentication. Additionally, it is important to be aware of phishing scams and to be skeptical of unsolicited emails or messages.

{{< image src="20230124132448.png" caption="DES Cracker circuit board by the Electric Frontier Foundation [EFF](https://www.eff.org/) fitted with 64 Deep Crack chips using both sides. A 250,000 US$ DES cracking machine containing over 1,800 custom chips and could brute-force a DES key in a matter of days. ([EFF](https://www.eff.org/))" >}}

# Two-Factor (2FA) and Multi-Factor Authentication (MFA)
Another way to protect personal information is to use two-factor authentication (2FA), which requires the user to provide two forms of identification before gaining access to an account or system. This can include a password and a fingerprint, or a password and a code sent to the user's phone. 2FA adds an extra layer of security, as even if a hacker is able to guess or steal a password, they will not be able to access the account without the second form of identification.

{{< image src="20230124133341.png" caption=".">}}

Multi-Factor Authentication (MFA) is an extension of 2FA, which involves providing multiple forms of identification before gaining access to an account or system. This can include a combination of something the user knows (such as a password), something the user has (such as a token or smartphone), and something the user is (such as a fingerprint or facial recognition). MFA is considered to be even more secure than 2FA, as it adds multiple layers of protection and makes it much more difficult for a hacker to gain access to an account or system.

# Phishing Scams
It is also important to be aware of phishing scams, which are attempts to trick individuals into giving away their personal information. These scams can take the form of emails or text messages that appear to be from a legitimate source, such as a bank or government agency, but are actually from a hacker trying to steal personal information. To avoid falling for a phishing scam, it is important to be skeptical of unsolicited emails or messages and to not click on any links or provide any personal information unless you are certain of the source.

# Conclusion
In conclusion, cybersecurity is an important practice that helps to protect personal information, such as passwords, from unauthorized access. Tools like Have I Been Pwned (HIBP) can be used to check the strength of a password and determine if it has been involved in a data breach. The strength of a password is determined by its complexity and length, and the time it takes to crack a password depends on the resources available to the person trying to crack it. To protect personal information, it is important to use strong passwords and passphrases, and to use two-factor authentication. Additionally, it is important to be aware of phishing scams and to be skeptical of unsolicited emails or messages.

{{< admonition info References >}}
- [Hivesystems](https://www.hivesystems.io/password)
- [HIBP](https://haveibeenpwned.com/)
- [HIBQ](https://hibq.azurewebsites.net/)
- [Brute-force attack](https://en.wikipedia.org/wiki/Brute-force_attack)
- [EFF](https://www.eff.org/)
{{< /admonition >}}

