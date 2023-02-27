const {importAstGenerator, dataTypeAstGenerator} = require("../dist/cjs/createAst");

test("importAstGenerator", () => {
    const ast = importAstGenerator(
        "auto varname = [ include: 'filepath' ] as const",
    );

    expect(ast).toEqual({
        keyword: {
            type: "dataType",
            name: "auto",
        },
        name: "varname",
        value: {
            type: "import",
            value: "filepath",
        },
        spec: {
            type: "const",
        },
    });
});

test("dataTypeAstGenerator", () => {
    const ast = dataTypeAstGenerator("string dir = './commands/'");

    expect(ast).toEqual({
        keyword: {
            type: "dataType",
            name: "string",
        },
        name: "dir",
        value: {
            type: "string",
            value: "./commands/",
        },
        spec: null,
    });
});
