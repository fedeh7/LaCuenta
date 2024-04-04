import {
    BeerCanIcon,
    BeerMugIcon,
    CakeIcon,
    CheeseCakeIcon,
    ChocolateBarIcon,
    ColaIcon,
    DumplingIcon,
    FriesIcon,
    HamburgerIcon,
    HotdogIcon,
    IceCreamIcon,
    IngredientsIcon,
    JuiceIcon,
    MeatIcon,
    PizzaIcon,
    PopcornIcon,
    SaladIcon,
    SandwichIcon,
    SausageIcon,
    SpaghettiIcon,
    SushiIcon,
    ThnaksgivingIcon,
    WrapIcon,
} from '../Components/Icons';

// Card types
export const USER_TYPE = 'user';
export const FOOD_TYPE = 'food';
export const cardTypesValues = [USER_TYPE, FOOD_TYPE] as const;

// Food Icons
export const HAMBURGER_ICON = 'hamburger';
export const CHEESECAKE_ICON = 'cheesecake';
export const CAKE_ICON = 'cake';
export const CHOCOLATE_ICON = 'chocolate';
export const COLA_ICON = 'cola';
export const FRIES_ICON = 'fries';
export const HOTDOG_ICON = 'hotdog';
export const ICECREAM_ICON = 'icecream';
export const INGREDIENTS_ICON = 'ingredients';
export const MEAT_ICON = 'meat';
export const JUICE_ICON = 'juice';
export const PIZAA_ICON = 'pizza';
export const POPCORN_ICON = 'popcorn';
export const SALAD_ICON = 'salad';
export const SANDWICH_ICON = 'sandwich';
export const SAUSAGE_ICON = 'sausage';
export const SPAGHETTI_ICON = 'spaghetti';
export const SUSHI_ICON = 'sushi';
export const THANKSGIVING_ICON = 'thanksgiving';
export const WRAP_ICON = 'wrap';
export const BEER_MUG_ICON = 'beerMug';
export const BEER_CAN_ICON = 'beerCan';
export const DUMPLING_ICON = 'dumpling';

export const foodNameValues = [
    // Most common foods
    HAMBURGER_ICON,
    PIZAA_ICON,
    DUMPLING_ICON,
    FRIES_ICON,
    HOTDOG_ICON,
    SALAD_ICON,
    SANDWICH_ICON,
    SAUSAGE_ICON,
    ICECREAM_ICON,
    INGREDIENTS_ICON,
    MEAT_ICON,

    // Most common drinks
    COLA_ICON,
    JUICE_ICON,
    BEER_MUG_ICON,
    BEER_CAN_ICON,

    // Other foods and drinks
    CHEESECAKE_ICON,
    CAKE_ICON,
    CHOCOLATE_ICON,
    POPCORN_ICON,
    SPAGHETTI_ICON,
    SUSHI_ICON,
    THANKSGIVING_ICON,
    WRAP_ICON,
] as const; // By declaring it as const again, we generate a special type that we can then use as a string literal for every value in the array

export const FoodIcons = {
    // Most common foods
    [HAMBURGER_ICON]: () => <HamburgerIcon />,
    [PIZAA_ICON]: () => <PizzaIcon />,
    [DUMPLING_ICON]: () => <DumplingIcon />,
    [FRIES_ICON]: () => <FriesIcon />,
    [HOTDOG_ICON]: () => <HotdogIcon />,
    [SALAD_ICON]: () => <SaladIcon />,
    [SANDWICH_ICON]: () => <SandwichIcon />,
    [SAUSAGE_ICON]: () => <SausageIcon />,
    [ICECREAM_ICON]: () => <IceCreamIcon />,
    [INGREDIENTS_ICON]: () => <IngredientsIcon />,
    [MEAT_ICON]: () => <MeatIcon />,

    // Most common drinks
    [COLA_ICON]: () => <ColaIcon />,
    [JUICE_ICON]: () => <JuiceIcon />,
    [BEER_MUG_ICON]: () => <BeerMugIcon />,
    [BEER_CAN_ICON]: () => <BeerCanIcon />,

    // Other foods and drinks
    [CHEESECAKE_ICON]: () => <CheeseCakeIcon />,
    [CAKE_ICON]: () => <CakeIcon />,
    [CHOCOLATE_ICON]: () => <ChocolateBarIcon />,
    [POPCORN_ICON]: () => <PopcornIcon />,
    [SPAGHETTI_ICON]: () => <SpaghettiIcon />,
    [SUSHI_ICON]: () => <SushiIcon />,
    [THANKSGIVING_ICON]: () => <ThnaksgivingIcon />,
    [WRAP_ICON]: () => <WrapIcon />,
};
