export const emptyProgress=()=>({found:[],placed:[]});
export function normalizeProgress(value){const valid=x=>Number.isInteger(x)&&x>=0&&x<6;const found=[...new Set(Array.isArray(value?.found)?value.found.filter(valid):[])];return {found,placed:[...new Set(Array.isArray(value?.placed)?value.placed.filter(x=>valid(x)&&found.includes(x)):[])]}}
export function collectFragment(progress,id){if(!Number.isInteger(id)||id<0||id>=6)return progress;return {...progress,found:[...new Set([...progress.found,id])]}}
export function placeFragment(progress,selected,slot){if(selected!==slot||!progress.found.includes(selected)||progress.placed.includes(selected))return progress;return {...progress,placed:[...progress.placed,selected]}}
export const isComplete=progress=>[0,1,2,3,4,5].every(id=>progress.placed.includes(id));
