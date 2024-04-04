import { FoodIcons } from '../../Constants';
import {
    cheescakeLogo,
    cakeLogo,
    chocolateLogo,
    colaLogo,
    frenchFriesLogo,
    hamburgerLogo,
    hotDogLogo,
    iceCreamLogo,
    ingredientsLogo,
    meatLogo,
    orangeJuiceLogo,
    pizzaLogo,
    popcornLogo,
    saladLogo,
    sandwichLogo,
    sausageLogo,
    spaghettiLogo,
    sushiLogo,
    thanksgivingLogo,
    wrapLogo,
    beerMugLogo,
    beerCanLogo,
    dumplingLogo,
    trashLogo,
} from '../../Constants/Assets';
import { foodValues } from '../../Constants/interfaces';
import './Icon.scss';

const Icon = ({ imageUrl, altText }: { imageUrl: string; altText: string }) => {
    return <img className="icon-base" src={imageUrl} alt={altText} />;
};

export const FoodIconRenderer = ({ icon }: { icon: foodValues }) => {
    const getIcon = FoodIcons[icon];
    return getIcon();
};

export const CheeseCakeIcon = () => {
    return <Icon imageUrl={cheescakeLogo} altText="Torta" />;
};
export const ChocolateBarIcon = () => {
    return <Icon imageUrl={chocolateLogo} altText="Chocolate" />;
};
export const IceCreamIcon = () => {
    return <Icon imageUrl={iceCreamLogo} altText="Helado" />;
};
export const SaladIcon = () => {
    return <Icon imageUrl={saladLogo} altText="Ensalada" />;
};
export const SpaghettiIcon = () => {
    return <Icon imageUrl={spaghettiLogo} altText="Pastas" />;
};
export const CakeIcon = () => {
    return <Icon imageUrl={cakeLogo} altText="Torta de cumpleaños" />;
};
export const ColaIcon = () => {
    return <Icon imageUrl={colaLogo} altText="Gaseosa" />;
};
export const FriesIcon = () => {
    return <Icon imageUrl={frenchFriesLogo} altText="Papas fritas" />;
};
export const HamburgerIcon = () => {
    return <Icon imageUrl={hamburgerLogo} altText="Hamburguesa" />;
};
export const HotdogIcon = () => {
    return <Icon imageUrl={hotDogLogo} altText="Pancho" />;
};
export const IngredientsIcon = () => {
    return <Icon imageUrl={ingredientsLogo} altText="Ingredientes" />;
};
export const MeatIcon = () => {
    return <Icon imageUrl={meatLogo} altText="Carne" />;
};
export const JuiceIcon = () => {
    return <Icon imageUrl={orangeJuiceLogo} altText="Jugo" />;
};
export const PizzaIcon = () => {
    return <Icon imageUrl={pizzaLogo} altText="Pizza" />;
};
export const PopcornIcon = () => {
    return <Icon imageUrl={popcornLogo} altText="Pororo" />;
};
export const SushiIcon = () => {
    return <Icon imageUrl={sushiLogo} altText="Sushi" />;
};
export const SandwichIcon = () => {
    return <Icon imageUrl={sandwichLogo} altText="Sanguche" />;
};
export const SausageIcon = () => {
    return <Icon imageUrl={sausageLogo} altText="Salchicha" />;
};
export const ThnaksgivingIcon = () => {
    return <Icon imageUrl={thanksgivingLogo} altText="Pavo" />;
};
export const WrapIcon = () => {
    return <Icon imageUrl={wrapLogo} altText="Wrap" />;
};
export const BeerMugIcon = () => {
    return <Icon imageUrl={beerMugLogo} altText="Beer mug" />;
};
export const BeerCanIcon = () => {
    return <Icon imageUrl={beerCanLogo} altText="Beer can" />;
};
export const DumplingIcon = () => {
    return <Icon imageUrl={dumplingLogo} altText="Dumpling" />;
};
export const TrashIcon = () => {
    return <Icon imageUrl={trashLogo} altText="Trash" />;
};
