export const randomColor = () => {
  const randomHex = () => '0123456789ACBDEF'[Math.floor(Math.random() * 16)]
  return '#' + new Array(6).fill(0).map(randomHex).join('')
}
