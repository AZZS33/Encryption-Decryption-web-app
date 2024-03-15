import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.css']
})
export class EncryptComponent {


methodOfEncrypt:String ="";
cipherText:String ="";







selectCipher(method: string) {
  this.methodOfEncrypt = method;
  console.log(this.methodOfEncrypt);

  
}

  encrypt(loginForm: NgForm){
    console.log(loginForm.value)

    let thecipher: string = '';


    if(this.methodOfEncrypt=="playfair"){

      this.playfairEncrypt(loginForm.value.plaintext,loginForm.value.key)
    }

 if(this.methodOfEncrypt=="railfence"){
  const number = parseFloat(loginForm.value.key);

  this.cipherText = this.encryptRailFence(loginForm.value.plaintext,number);
  }

  if(this.methodOfEncrypt=="Vigenere"){
loginForm.value.plaintext.toUpperCase();
loginForm.value.key.toUpperCase();
    let key = this.generateKey(loginForm.value.plaintext.toUpperCase(),loginForm.value.key.toUpperCase());
    
  this.cipherText=this.tocipherText(loginForm.value.plaintext.toUpperCase(),key);
  }


    if(this.methodOfEncrypt=="Combine Algorithms"){

      let string = this.playfairEncrypt(loginForm.value.plaintext.toUpperCase(),loginForm.value.key.toUpperCase())
      this.cipherText = string;
      let key = this.generateKey(this.cipherText.toUpperCase(),loginForm.value.key.toUpperCase());
      this.cipherText=this.tocipherText(this.cipherText.toUpperCase(),key);

      




    }



}



//playfair

   playfairEncrypt(message:any, key:any) {
  
    // Prepare the key square
    const keySquare = this.prepareKeySquare(key);
  
    // Prepare the message by removing non-alphabetic characters
    const plaintext = this.preparePlaintext(message);
  
    // Generate the digraphs
    const digraphs = this.generateDigraphs(plaintext);
  
    // Encrypt the digraphs
    let ciphertext = '';
    digraphs.forEach(digraph => {
      const encryptedDigraph = this.encryptDigraph(digraph, keySquare);
      ciphertext += encryptedDigraph;
    });
    this.cipherText=ciphertext;
    return ciphertext;
    
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
  
   preparePlaintext(message:any) {
    // Remove non-alphabetic characters and convert to uppercase
    return message.replace(/[^a-zA-Z]/g, '').toUpperCase();
  }
  
   generateDigraphs(plaintext:any) {
    const digraphs = [];
    let i = 0;
    while (i < plaintext.length) {
      let digraph = plaintext[i];
      if (i === plaintext.length - 1 || plaintext[i] === plaintext[i + 1]) {
        digraph += 'X';
        i++;
      } else {
        digraph += plaintext[i + 1];
        i += 2;
      }
      digraphs.push(digraph);
    }
    return digraphs;
  }
  
   encryptDigraph(digraph:any, keySquare:any) {
    const row1 = Math.floor(keySquare.indexOf(digraph[0]) / 5);
    const col1 = keySquare.indexOf(digraph[0]) % 5;
    const row2 = Math.floor(keySquare.indexOf(digraph[1]) / 5);
    const col2 = keySquare.indexOf(digraph[1]) % 5;
  
    let encryptedDigraph = '';
  
    if (row1 === row2) {
      encryptedDigraph += keySquare[row1 * 5 + (col1 + 1) % 5];
      encryptedDigraph += keySquare[row2 * 5 + (col2 + 1) % 5];
    } else if (col1 === col2) {
      encryptedDigraph += keySquare[((row1 + 1) % 5) * 5 + col1];
      encryptedDigraph += keySquare[((row2 + 1) % 5) * 5 + col2];
    } else {
      encryptedDigraph += keySquare[row1 * 5 + col2];
      encryptedDigraph += keySquare[row2 * 5 + col1];
    }
  
    return encryptedDigraph;
  }
  
   removeDuplicates(str:any) {
    return str
      .split('')
      .filter((value: any, index: any, self: string | any[]) => self.indexOf(value) === index)
      .join('');
  }
  //playfair

//railfance

 encryptRailFence(text:any, rails:number) {
  if (rails <= 1 || rails >= text.length) {
    return text; // No change for invalid number of rails
  }

  const fence = new Array(rails).fill("");
  let rail = 0;
  let direction = 1; // Direction 1 for going down, -1 for going up

  for (const char of text) {
    fence[rail] += char;

    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  const ciphertext = fence.join("");
  return ciphertext;
}


//raiffance



//viginere 

















//vigenere
 generateKey(str:any,key:any)
    {
        
        key=key.split("");
        if(str.length == key.length)
            return key.join("");
        else
        {
            let temp=key.length;   
            for (let i = 0;i<(str.length-temp) ; i++)
            {
                key.push(key[i % ((key).length)]);  
            }
        }
        return key.join("");
    }


     tocipherText(str:any,key:any)
    {
        let cipher_text="";
        for (let i = 0; i < str.length; i++)
        {
            // converting in range 0-25
            let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) %26;
            // convert into alphabets(ASCII)
            x += 'A'.charCodeAt(0);
            //document.write("E["+i+"] =  P["+i+"]+K["+i+"] 26 ="+String.fromCharCode(x)+"<br>");
            cipher_text+=String.fromCharCode(x);
            
            
        }
        return cipher_text;
    }
//vigenere 

}
function prepareKeySquare(key: string): string {
  throw new Error('Function not implemented.');
}

function preparePlaintext(message: string): string {
  throw new Error('Function not implemented.');
}

function generateDigraphs(plaintext: string): string[] {
  throw new Error('Function not implemented.');
}

function encryptDigraph(digraph: string, keySquare: string): string {
  throw new Error('Function not implemented.');
}

