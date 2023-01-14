<p align="center">
  <a href="https://github.com/Evil-Bees/Alertit/">
    <img src="https://raw.githubusercontent.com/Evil-Bees/Alertit/main/public/alertit-logo.png" alt="Alertit logo" width="300" />
  </a>
</p>

<h1 align="center">Monitoring all of your important online activity 🖥️</h1>
<br>

## Features

- Know if your website is offline right away! Reliable monitoring saves your money, reputation and clients — by alerting you before any major problems arise.

- Utilize one of the instruments that administrators use most frequently to verify the availability of network devices.

- Be informed!
Even the strongest among us have downtime. However, it's crucial to be aware of it before clients are impacted!

## Contributing
Feel like contributing? That's awesome!

Thanks for showing interest to contribute to AlertIt 💖, you rock!

There are different ways you can contribute, all of which are valuable:
- Fork the project
- Take on one of active issues
- Make a pull request

[Here are a few guidelines](CONTRIBUTING.md) that should help you as you prepare to make your contribution.

If you have any questions, feel free to contact us on Github discussions or issues page.

We are always active on discord server.

If you like the project, but don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer to this project in your project's README
> - Share on your socials ([Facebook](https://www.facebook.com/profile.php?id=100088394168553), [Instagram](https://www.instagram.com/evilbeesdev/), [TikTok](https://www.tiktok.com/@evilbeesdev), [YouTube](https://www.youtube.com/@evilbees), [LinkedIn](https://www.linkedin.com/company/evil-bees/))
> - Mention the project at local meetups and tell your friends/colleagues

## Style Guide
- This project uses [Tailwind](https://tailwindcss.com/) on the front end. Please avoid using inline and scss styles unless absolutely necessary.

## Formatting
- We use [Prettier+](https://prettier.io/) to format .js files.

## API documentation
All necessary API documentation is available here.

https://documenter.getpostman.com/view/3551458/2s83zcT7GT

## Usage

Edit .env.local file:

```bash
MONGODB_URI="URL FOR MONGO DATABASE" 
SITE_URI="http://localhost:3000"

#FOR AUTH CHANGE THIS WITH RANDOM STRINGS FOR HASHING.
NEXTAUTH_JWT_SECRET="b4ed764b60a9a9be8452f06ca06519f9"
NEXTAUTH_SECRET="b4ed764b60a9a9be8452f06ca06519f9"
```

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
