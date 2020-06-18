Heroku CLI Commands

heroku create react-ecommerce-allan --buildpack http://github.com/mars/create-react-app-buildpack.git
git push heroku master


`heroku apps`
`heroku git:remote -a react-ecommerce-allan`
https://git.heroku.com/react-ecommerce-allan.git

Remove buildpacks:
`heroku buildpacks`
`heroku buildpacks:remove http://github.com/mars/create-react-app-buildpack.git`