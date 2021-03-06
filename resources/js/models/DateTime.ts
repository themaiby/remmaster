import * as moment from 'moment';
import {Moment} from 'moment';
import "moment-timezone";
import {Transform, Type} from "class-transformer";
import {usersStore} from "../store/modules/UsersStore";

export class DateTime {
  /* Converts ATOM string -> JS Date -> moment.js */
  @Type(() => Date)
  @Transform((value: Date) => {
    if (usersStore.currentUser.timezone === 'UTC') return moment(value).utc(); // to prevent converting UTC => UTC
    return moment(value).tz(usersStore.currentUser.timezone, true)
  }, {toClassOnly: true})
  date: Moment = moment('');
}
