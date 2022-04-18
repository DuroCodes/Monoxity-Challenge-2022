const removeDupe = (a: string[], b: string[]): string[] => [...new Set([...a, ...b])];

console.log(removeDupe(['Hello', 'Hello', 'world', 'this', 'is', 'is', 'world'], ['this', 'a', 'test', 'array', 'test']));
