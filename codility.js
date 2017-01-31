// // function solution(N) {
// //     // write your code in JavaScript (Node.js 6.4.0)
// //     var nBin = (N >>> 0).toString(2);
// //     var size = 0;
// //     var splitArray = nBin.split("1");
// //     var loop = splitArray.length - 1;
// //     for (var i = 0; i < loop; i++) {
// //         if(splitArray[i] && splitArray[i].length > 0) {
// //             if(splitArray[i].length > size) {
// //                 size = splitArray[i].length;
// //             }
// //         }
// //     }
// //     console.log(splitArray);
// //     console.log(size);
// //     process.exit(0);
// // }
// // solution(51712);

// var A = [];
// A[0] = -1;
// A[1] =  3;
// A[2] = -4;
// A[3] =  5;
// A[4] =  1;
// A[5] = -6;
// A[6] =  2;
// A[7] =  1;

// function baseCase1 (A) {
//     var aS = A.length;
//     var sum = 0;
//     for(var i = 1; i < aS; i++) {
//         sum = sum + A[i];
//     }
//     if(sum === 0) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function baseCase2 (A) {
//     var aS = A.length - 1;
//     var sum = 0;
//     for(var i = 0; i < aS; i++) {
//         sum = sum + A[i];
//     }
//     if(sum === 0) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function somaArray (A) {
//     var aS = A.length;
//     if(A.length == 1) {
//         return A[0];
//     } else {
//         var sum = 0;
//         for(var i = 0; i < aS; i++) {
//             sum = sum + A[i];
//         }
//         return sum;
//     }
// }

// // function solution(A) {
// //     // write your code in JavaScript (Node.js 6.4.0)
// //     var aS = A.length;
// //     aS1 = aS - 1;
// //     var result = [];
// //     if(aS > 0) {
// //         if(baseCase1(A)) {
// //             return 0;
// //         }
// //         if(baseCase2(A)) {
// //             return aS1; 
// //         }
// //         for(var i = 1; i < aS; i++) {
// //             var a1Temp = A;
// //             var p1 = a1Temp.slice(0,i);
// //             var soma1 = somaArray(p1);
// //             var a2Temp = A;
// //             var p2 = a2Temp.slice(i+1);
// //             var soma2 = somaArray(p2);
// //             if(soma1 == soma2) {
// //                 result.push(i);    
// //             }
// //         }
// //         if(result.length > 0) {
// //             //console.log(result);
// //             return result[0];
// //         } else {
// //             return -1;
// //         }
// //     } else {
// //         return -1;
// //     }
// // }

// //console.log(solution(A));


// // function countBracket (A, _b) {
// //     var aS = A.length;
// //     var count = 0;
// //     for(var i = 0; i < aS; i++) {
// //         if(A[i] === _b) {
// //             count++;
// //         }
// //     }
// //     return count;
// // }

// // function solution(S) {
// //     var sArray = S.split("");
// //     var aS = sArray.length;
// //     if(aS > 0) {
// //         for(var i = 1; i < aS; i++) {
// //             var p1 = S.slice(0,i);
// //             var countOpen = countBracket(p1,'(');
// //             var p2 = S.slice(i+1);
// //             var countClose = countBracket(p2,')');
// //             if(countOpen === countClose) {
// //                 return i+1;    
// //             }
// //         }
// //         return -1;
// //     } else {
// //         return -1;
// //     }
// // }
// // console.log(solution("(())))("));


// function convertBase (A) {
//     var l = A.length;
//     var soma = 0;
//     for(var i = 0; i < l; i++) {
//         var s = Math.pow(-2, i);
//         soma = soma + (A[i]*s);
//     }
//     return soma;
// }

// function toBase2 (n) {
// 	var base = -2;
//     var result = [];
// 	var digit = "";
// 	do{
// 		digit = n % base;
//         if(digit <= 9) result.push(digit.toString());
//         else result = result.push(String.fromCharCode(digit+55));
// 		n = (n - n%base) / base;
// 	}while(n > 0)
// 	return result;
// };

// function solution(A) {
//     var X = convertBase(A);
//     var minusX = X * -1;
//     //var base2 = Number(minusX).toString(2)
//     return toBase2(minusX);
// }
// console.log(solution([1,0,0,1,1,1]));