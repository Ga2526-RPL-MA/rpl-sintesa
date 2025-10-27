export function getRandomInt(max = 0, min = 0){
  if(!Number.isInteger(max) || !Number.isInteger(min)) throw new Error("Parameter must be an Integer")
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomEvenInt(max = 0, min = 0){
  let number = getRandomInt(max, min)
  return number-(number&1)
}