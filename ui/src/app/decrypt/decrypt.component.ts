import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css']
})
export class DecryptComponent implements OnInit{


  methodOfEncrypt:String ="";
  cipherText:String ="";
  
  selectCipher(method: string) {
    this.methodOfEncrypt = method;
    console.log(this.methodOfEncrypt);
  
    
  }


  ngOnInit(): void {
  }

  constructor(){

  }




  decrypt(loginForm: NgForm){
    console.log(loginForm.value)

    if(this.methodOfEncrypt=="playfair"){
      this.playfairDecrypt(loginForm.value.plaintext,loginForm.value.key);

    }

 if(this.methodOfEncrypt=="railfence"){
  const number = parseFloat(loginForm.value.key);
  this.cipherText = this.decryptRailFence(loginForm.value.plaintext,number);
  }

  if(this.methodOfEncrypt=="Vigenere"){
loginForm.value.plaintext.toUpperCase();
loginForm.value.key.toUpperCase();
let key = this.generateKey(loginForm.value.plaintext.toUpperCase(),loginForm.value.key.toUpperCase());
this.cipherText = this.decipherText(loginForm.value.plaintext, key);


  }
  if(this.methodOfEncrypt=="Combine Algorithms"){
    this.cipherText.toUpperCase()
   
    let key = this.generateKey(loginForm.value.plaintext.toUpperCase(),loginForm.value.key.toUpperCase());
   
    this.cipherText=this.decipherText(loginForm.value.plaintext.toUpperCase(),key);
    this.cipherText = this.playfairDecrypt(this.cipherText,key)


    




  }




}



//playfair



 playfairDecrypt(message:any, key:any) {
  // Prepare the key square
  const keySquare = this.prepareKeySquare(key);

  // Generate the digraphs
  const digraphs = this.generateDigraphs(message);

  // Decrypt the digraphs
  let plaintext = '';
  digraphs.forEach(digraph => {
    const decryptedDigraph = this.decryptDigraph(digraph, keySquare);
    plaintext += decryptedDigraph;
  });
  var input = document.getElementById("sasa");
this.cipherText = plaintext;
return plaintext;
 

}

 prepareKeySquare(key:any) {
  // Remove duplicate letters from the key
  key = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
  key = this.removeDuplicates(key);

  // Create the key square
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  let keySquare = key + alphabet;
  keySquare = this.removeDuplicates(keySquare);

  return keySquare;
}

 generateDigraphs(message:any) {
  // Prepare the message by removing non-alphabetic characters
  message = message.replace(/[^a-zA-Z]/g, '').toUpperCase();

  const digraphs = [];
  let i = 0;
  while (i < message.length) {
    let digraph = message[i];
    if (i === message.length - 1 || message[i] === message[i + 1]) {
      digraph += 'X';
      i++;
    } else {
      digraph += message[i + 1];
      i += 2;
    }
    digraphs.push(digraph);
  }
  return digraphs;
}


 decryptDigraph(digraph:any, keySquare:any) {
  const row1 = Math.floor(keySquare.indexOf(digraph[0]) / 5);
  const col1 = keySquare.indexOf(digraph[0]) % 5;
  const row2 = Math.floor(keySquare.indexOf(digraph[1]) / 5);
  const col2 = keySquare.indexOf(digraph[1]) % 5;

  let decryptedDigraph = '';

  if (row1 === row2) {
    decryptedDigraph += keySquare[row1 * 5 + (col1 + 4) % 5];
    decryptedDigraph += keySquare[row2 * 5 + (col2 + 4) % 5];
  } else if (col1 === col2) {
    decryptedDigraph += keySquare[((row1 + 4) % 5) * 5 + col1];
    decryptedDigraph += keySquare[((row2 + 4) % 5) * 5 + col2];
  } else {
    decryptedDigraph += keySquare[row1 * 5 + col2];
    decryptedDigraph += keySquare[row2 * 5 + col1];
  }

  return decryptedDigraph;
}
 
 removeDuplicates(text:any) {
  return text
    .split('')
    .filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index)
    .join('');
}




//playfair


//railfence
 decryptRailFence(ciphertext:any, rails:any) {
  if (rails <= 1 || rails >= ciphertext.length) {
    return ciphertext; // No change for invalid number of rails
  }

  const fence = new Array(rails);
  for (let i = 0; i < rails; i++) {
    fence[i] = new Array(ciphertext.length);
  }

  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < ciphertext.length; j++) {
      fence[i][j] = ' ';
    }
  }

  let rail = 0;
  let direction = 1;

  for (let i = 0; i < ciphertext.length; i++) {
    fence[rail][i] = '*';

    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  let index = 0;
  const plaintext = new Array(ciphertext.length);

  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < ciphertext.length; j++) {
      if (fence[i][j] === '*' && index < ciphertext.length) {
        plaintext[j] = ciphertext[index];
        index++;
      }
    }
  }

  return plaintext.join('');
}


//railfance

//viginere



 generateKey(str:any, key:any) {
  key = key.split("");
  if (str.length == key.length)
      return key.join("");
  else {
      let temp = key.length;
      for (let i = 0; i < (str.length - temp); i++) {
          key.push(key[i % key.length]);
      }
  }
  return key.join("");
}




 tocipherText(str:any, key:any) {
  let cipher_text = "";
  for (let i = 0; i < str.length; i++) {
      let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) % 26;
      x += 'A'.charCodeAt(0);
      cipher_text += String.fromCharCode(x);
  }
  return cipher_text;
}
 decipherText(cipher_text:any, key:any) {
  let orig_text = "";
  for (let i = 0; i < cipher_text.length; i++) {
      let x = (cipher_text[i].charCodeAt(0) - key[i].charCodeAt(0) + 26) % 26;
      x += 'A'.charCodeAt(0);
      orig_text += String.fromCharCode(x);
  }
  return orig_text;
}

//vigenere
}
