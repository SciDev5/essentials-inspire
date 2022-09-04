import { Arr } from "@scidev5/util-h";

const charset = "()*-.0123456789<=>ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒ".split("");
const reverseCharset = Object.fromEntries(charset.map((v,i)=>[v,i]));

const B128LE = {
    encode(bytes:Uint8Array):string {
        let builtString = "";
        const bits:boolean[] = [];
        for (const byte of bytes) {
            bits.push(...Arr.genByI(8,i=>!!(byte&(1<<i))));

            while (bits.length >= 7)
                builtString += charset[
                    bits.splice(0,7)
                        .map((v,i)=>(v?1<<i:0))
                        .reduce((a,b)=>a+b)
                ];
        }
        if (bits.length > 0) // pad with 0s
            builtString +=
                    charset[
                        [...bits,...Arr.genFill(7,false)].slice(0,7)
                            .map((v,i)=>(v?1<<i:0))
                            .reduce((a,b)=>a+b)
                    ];
        return builtString;
    },
    decode(encoded:string):Uint8Array {
        const bytes = new Uint8Array(Math.floor(encoded.length*(7/8)));
        let currentI = -1;
        const bits:boolean[] = [];
        for (const encChar of encoded) {
            const value = reverseCharset[encChar];
            if (value === undefined) throw new Error("B128LE::decode(encoded) received unknown char "+encChar);

            bits.push(...Arr.genByI(7,i=>!!(value&(1<<i))));

            while (bits.length >= 8)
                bytes[++currentI] =
                    bits.splice(0,8)
                        .map((v,i)=>(v?1<<i:0))
                        .reduce((a,b)=>a+b);
        }
        return bytes;
    }
};
export default B128LE;