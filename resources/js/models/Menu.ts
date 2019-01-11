export interface MenuItem {
    icon: string;
    routeName: string;
    text: string;
    ['icon-alt']?: string;
    children?: MenuItem;
}

export default class Menu {
    constructor(items: MenuItem[]) {
        this._items = items;
    }

    private readonly _items: MenuItem[];

    get items(): MenuItem[] {
        return this._items;
    }

    // Return icon from backend menu for specified route
    getIconByRouteName(routeName: string): string | null {
        const items: MenuItem[] = this.items.filter((item: MenuItem) => {
            return routeName === item.routeName
        });

        if (!items.length) return null;
        return items[0].icon;
    }
}
