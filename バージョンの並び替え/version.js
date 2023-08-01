const versions = [
  "1.3.0.9",
  "0.2.0",
  "3.1.2",
  "0.1.6",
  "5.0.0",
  "3.3.3.3",
  "3.3.3.3.3",
  "3.10",
  "0.2.0",
];
let arr2 = versions.map((item) => item.split(".").map((item2) => Number(item2)));
const max_number = Math.max(...arr2.flat()) + 1;
const max_column = arr2.reduce((acc, cur) => {
  return acc.length < cur.length ? cur : acc;
}).length;

console.log(arr2);
console.log(max_number);
console.log(max_column);

arr2=arr2.map((row) => {
  let sum = 0;
  let power = max_column;
  for (let i = 0; i < row.length; i++) {
    sum += row[i] * Math.pow(max_number, power);
    power--;
  }
  return [sum,row];
});
console.log(arr2);
arr2=heapSortRowsByFirstElement(arr2)
arr2=arr2.map((e)=>e[1]);
arr2=arr2.map((e)=>e.join("."));
console.log(arr2);
function heapSortRowsByFirstElement(arr) {
    // ヒープを構築する関数（行の最初の要素で比較）
    function buildHeap(arr) {
      const len = arr.length;
      // 非葉ノードからヒープを構築する
      for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        heapify(arr, len, i);
      }
    }
  
    // ヒープを再構築する関数（行の最初の要素で比較）
    function heapify(arr, len, index) {
      let largest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
  
      if (leftChild < len && arr[leftChild][0] > arr[largest][0]) {
        largest = leftChild;
      }
  
      if (rightChild < len && arr[rightChild][0] > arr[largest][0]) {
        largest = rightChild;
      }
  
      if (largest !== index) {
        // 親ノードと子ノードを入れ替える
        [arr[index], arr[largest]] = [arr[largest], arr[index]];
        // 子ノードのヒープ再構築
        heapify(arr, len, largest);
      }
    }
  
    const resultArr = [...arr];
    const len = resultArr.length;
  
    buildHeap(resultArr);
  
    // ヒープから要素を取り出し、ソートされた配列を生成
    for (let i = len - 1; i > 0; i--) {
      // 最大値を末尾と入れ替える
      [resultArr[0], resultArr[i]] = [resultArr[i], resultArr[0]];
      // 末尾はソート済みのため、ヒープの範囲から除外
      heapify(resultArr, i, 0);
    }
  
    return resultArr;
  }