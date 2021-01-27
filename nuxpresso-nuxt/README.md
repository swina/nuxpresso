# nuxpresso-nuxt (alpha 0.0.1)


## Demo

https://nuxpresso.netlify.app


**Requirements**

nuxpresso-server (Strapi CMS)

https://github.com/swina/nuxpresso-server-test




## Install nuxpresso-nuxt



nuxpresso-nuxt is developed with NUXTJS. If you plan to use another frontend and develop your website using nuxpresso-server read our documentation.




Clone the repository
```
git clone https://github.com/swina/nuxpresso-nuxtjs
```


```
cd nuxpresso-nuxt
yarn install
```

Create an .env file in the project root
```
API_URL=http://localhost:1337
RECAPTCHA=__your_recaptcha_key 
NUXPRESSO_TITLE=nuxpresso
NUXPRESSO_HEADLINE=Your next CMS
VUE_APP_HERE_APIKEY=__here_map_key (if you plan to use the map component)
NUXPRESSO_DEV_USER=__development_user
NUXPRESSO_DEV_PASSWORD=_development_user_password
```
Run nuxpresso-nuxt
```
yarn dev
```

Your nuxpresso website is running on http://localhost:3000

### Run some test locally

Start creating some content in your nuxpresso-server so you can run a test to check that everything is working with no errors

## Deploy

Generate the full static version (by default in the dist folder)

```
yarn generate
```

**Commit to your repo** (*remember to remove dist from .gitignore*)

Change the origin to you repo.

```
git add .
git commit -m "My commit"
git push -u origin master
```

Deploy on your favorite provider. Most of them have a CI option to a repo.
Remember that the .env file is not created in the repo. You have to add the config variables as per your provider specs.
