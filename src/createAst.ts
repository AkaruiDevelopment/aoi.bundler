/*  function to convert "auto varname = [include: 'filePath' ] as const into a object in format of 

{
    keyword: {
        type: 'dataType',
        name: 'auto',
    },
    name: 'varname',
    value: {
        type: 'include',
        value: 'filePath',
    },
    spec : {
        type: 'const',
    }
}

spec must be null if "as const" is not present
*/
const importAstGenerator = (input: string) => {
    const regex =
        /^(auto)\s+(\w+)\s*=\s*\[\s*include\s*:\s*'(.*)'\s*\]\s*(?:as\s+(\w+)\s*)?$/;
    const match = input.match(regex);

    if (!match) {
        throw new Error("Invalid input format");
    }
    // console.log(match)
    const [_,datType, name, value, asType] = match;

    return {
        keyword: {
            type: "dataType",
            name:datType,
        },
        name,
        value: {
            type: "import",
            value,
        },
        spec: asType ? { type: asType } : null,
    };
};

const dataTypeAstGenerator = ( input: string ) =>
{ 
      const regex =
          /^(auto|string|char|int|ll|bool)\s+(\w+)\s*=\s*(.*?)(?:\s+as\s+(\w+))?$/;
      const match = input.match(regex);

      if (!match) {
          throw new Error("Invalid input format");
      }
    // console.log( match );
      let [, type, name, value,specType] = match;
      
      let valueType = null;
      if (/^{([\s\S]*)}$/.test(value)) {
          valueType = "string";
          value = value.slice(1, -1).trim();
      } else if (/^'(.*)'$/.test(value)) {
          valueType = "string";
          value = value.slice(1, -1);
      } else if (/^\d+$/.test(value)) {
          valueType = "number";
          // @ts-ignore
          value = Number(value);
      } else if (/^(true|false)$/.test(value)) {
          valueType = "boolean";
            // @ts-ignore
          value = value === "true";
      } else {
          valueType = "unknown";
      }

      return {
          keyword: {
              type: "dataType",
              name: type,
          },
            name,
          value: {
              type: valueType,
              value,
          },
          spec: specType ? { type: specType } : null,
      };
};
