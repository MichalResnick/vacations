import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";

 async function getImageAndGenareteName(vacation:VacationModel){
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
    vacation.imageName = uuid() + extension;
    await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
    delete vacation.image;
}

export default{
    getImageAndGenareteName
}