export default interface IMenu {
  icon: string;
  routeName: string;
  text: string;
  ['icon-alt']?: string;
  children?: IMenu;
}
