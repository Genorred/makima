import db from "../lib/db";
import {CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model} from "sequelize";

export interface GenshinDropUserInt {
    id: number
    number: number
    name: string
    xsrf: string
    ddg: string
    inviter: string
    webName: string
    webValue: string
    unknownName: string
    unknownValue: string
    ses: string
    days: number
}


class GenshinDropUser extends Model<
    InferAttributes<GenshinDropUser>,
    InferCreationAttributes<GenshinDropUser>
> {
    // id can be undefined during creation when using `autoIncrement`
    declare id: CreationOptional<number>;
    declare number: number
    declare name: string
    declare xsrf: string
    declare ddg: string
    declare inviter: string
    declare webName: string
    declare webValue: string
    declare unknownName: string
    declare unknownValue: string
    declare ses: string
    declare days: number
}

GenshinDropUser.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        number: {type: DataTypes.INTEGER, unique: true},
        name: {type: DataTypes.STRING, unique: true},
        xsrf: {type: DataTypes.STRING},
        ddg: {type: DataTypes.STRING},
        inviter: {type: DataTypes.STRING},
        webName: {type: DataTypes.STRING},
        webValue: {type: DataTypes.STRING},
        unknownName: {type: DataTypes.STRING},
        unknownValue: {type: DataTypes.STRING},
        ses: {type: DataTypes.STRING},
        days: {type: DataTypes.INTEGER},
    },
    {
        sequelize: db,
        tableName: 'GenshinDropUser'
    })
export default GenshinDropUser
