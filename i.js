const j = 'aabbccd'
const s = 'ab'

let count = 0

for (const item of j) for (const i of s) if (i === item) count++

console.log(count);
    
