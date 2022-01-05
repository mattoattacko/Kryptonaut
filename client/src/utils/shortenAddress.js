// Shortens the wallet address on the Welcome pages fake card looking thing
// We take the first 5 characters of the address and add an ellipsis up to the last 4 characters
export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;