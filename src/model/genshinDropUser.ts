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
        name: {type: DataTypes.TEXT, unique: true},
        xsrf: {type: DataTypes.TEXT},
        ddg: {type: DataTypes.TEXT},
        inviter: {type: DataTypes.TEXT},
        webName: {type: DataTypes.TEXT},
        webValue: {type: DataTypes.TEXT},
        unknownName: {type: DataTypes.TEXT},
        unknownValue: {type: DataTypes.TEXT},
        ses: {type: DataTypes.TEXT},
        days: {type: DataTypes.INTEGER},
    },
    {
        sequelize: db,
        tableName: 'GenshinDropUsers'
    })
export default GenshinDropUser
