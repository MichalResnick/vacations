class Config {
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public imagesUrl = "http://localhost:3001/api/vacations/images/";
    public followersUrl = "http://localhost:3001/api/followers/";
    public registerUrl = "http://localhost:3001/api/auth/register";
    public loginUrl = "http://localhost:3001/api/auth/login";
    public authUrl = "http://localhost:3001/api/auth/";
}

const appConfig = new Config(); // Singleton

export default appConfig;
