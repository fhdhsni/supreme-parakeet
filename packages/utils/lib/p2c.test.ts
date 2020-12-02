import { p2c } from "./p2c";

test("add className of props", () => {
  expect(
    p2c(
      {
        className: "text-sm",
      },
      {}
    )
  ).toBe("text-sm");
});

test("adds the values of key `$` without any condition", () => {
  expect(
    p2c(
      {},
      {
        $: "one two",
      }
    )
  ).toBe("one two");

  expect(
    p2c(
      { error: "warning" },
      {
        error: {
          $: "border",
          warning: "border-yellow",
        },
      }
    )
  ).toBe("border border-yellow");
});

test("adds the nested `$`s values, including the first falsy key", () => {
  expect(
    p2c(
      {},
      {
        $: "text-sm",
        danger: {
          $: "border",
          false: "border-gray",
          true: {
            $: "border-yellow",
            large: {
              $: "border-width-2",
              true: {
                foo: {
                  $: "bar",
                },
              },
            },
          },
        },
      }
    )
  ).toBe("text-sm border border-gray");

  expect(
    p2c(
      {
        danger: true,
      },
      {
        $: "text-sm",
        danger: {
          $: "border",
          false: "border-gray",
          true: {
            $: "border-yellow",
            large: {
              $: "border-width-2",
              true: {
                foo: {
                  $: "bar",
                },
              },
            },
          },
        },
      }
    )
  ).toBe("text-sm border border-yellow border-width-2");

  expect(
    p2c(
      {
        danger: true,
        large: true,
      },
      {
        $: "text-sm",
        danger: {
          $: "border",
          false: "border-gray",
          true: {
            $: "border-yellow",
            large: {
              $: "border-width-2",
              true: {
                foo: {
                  $: "bar",
                },
              },
            },
          },
        },
      }
    )
  ).toBe("text-sm border border-yellow border-width-2 bar");
});

test("adds classes based on their predicate in props", () => {
  expect(
    p2c(
      {
        disabled: true,
      },
      {
        disabled: {
          true: "text-secondary",
          false: "text-primary",
        },
      }
    )
  ).toBe("text-secondary");

  expect(
    p2c(
      {
        disabled: false,
      },
      {
        disabled: {
          true: "text-secondary",
          false: "text-primary",
        },
      }
    )
  ).toBe("text-primary");

  expect(
    p2c(
      {
        disabled: true,
      },
      {
        disabled: "text-secondary",
      }
    )
  ).toBe("text-secondary");

  expect(
    p2c(
      {
        disabled: false,
      },
      {
        disabled: "text-secondary",
      }
    )
  ).toBe("");
});

test("considers false when not provided", () => {
  const classes = {
    disabled: {
      $: "text-sm",
      true: "text-secondary",
      false: "text-primary",
    },
  };

  expect(p2c({}, classes)).toBe("text-sm text-primary");
});

test("supports nesting", () => {
  expect(
    p2c(
      {
        type: "large",
        error: true,
      },
      {
        type: {
          large: {
            error: "large-error",
          },
          small: {
            error: "small-error",
          },
        },
      }
    )
  ).toBe("large-error");

  expect(
    p2c(
      {
        type: "large",
      },
      {
        type: {
          large: {
            error: "large-error",
          },
          small: {
            error: "small-error",
          },
        },
      }
    )
  ).toBe("");
});

test("suppport functions", () => {
  expect(
    p2c(
      {
        error: true,
        type: "large",
      },
      {
        size(props) {
          return props.error && props.type === "large"
            ? "large-error"
            : "small-error";
        },
      }
    )
  ).toBe("large-error");
});

test("some edge case handling", () => {
  expect(
    p2c(
      { direction: "row", isInline: true },
      {
        $: "a",
        direction: {
          column: "-",
          row: "b",
        },
        isInline: "c",
      }
    )
  ).toBe("a b c");

  expect(
    p2c(
      {
        direction: "column",
        error: "nope",
        variant: "primary",
      },
      {
        direction: {
          $: "a",
          column: {
            $: "b",
            error: {
              $: "c",
              yes: {
                $: "x",
                variant: {
                  primary: "xx",
                },
              },
            },
          },
        },
        variant: {
          primary: "d",
        },
      }
    )
  ).toBe("a b c d");

  expect(
    p2c(
      {
        direction: "column",
        error: "yes",
        variant: "primary",
      },
      {
        direction: {
          $: "a",
          column: {
            $: "b",
            error: {
              $: "c",
              yes: {
                $: "d",
                variant: {
                  primary: "e",
                },
              },
            },
          },
        },
      }
    )
  ).toBe("a b c d e");

  expect(
    p2c(
      { disabled: true },
      {
        disabled: {
          true: {},
        },
      }
    )
  ).toBe("");
});
