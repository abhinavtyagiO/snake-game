describe("Test snake game", () => {
  // before(() => {
  //   cy.visit("http://localhost:3000/");
  // });

  // it("should have 3 radio buttons", () => {
  //   cy.get('[aria-labelledby="demo-controlled-radio-buttons-group"]').within(
  //     () => {
  //       cy.get("[type='radio'][value='easy']").should("have.length", 1);
  //       cy.get("[type='radio'][value='normal']").should("have.length", 1);
  //       cy.get("[type='radio'][value='hard']").should("have.length", 1);
  //     }
  //   );
  // });

  // it("should have a start game button, disabled initially", () => {
  //   cy.get("button").contains("Start Game").should("be.disabled");
  // });

  // it("button gets enabled once difficulty is selected", () => {
  //   cy.get("[type='radio'][value='easy']").click();
  //   cy.get("button").contains("Start Game").should("be.enabled").click();
  // });

  // it("should have a board with green bg", () => {
  //   cy.get("[class='board']")
  //     .should("have.css", "background-color", "rgb(164, 211, 72)")
  //     .and("have.css", "border", "24px solid rgb(83, 134, 51)");
  // });

  // it("should have a first snake with initial length equal to 3", () => {
  //   cy.get("[class='snake-body1']").within(() => {
  //     cy.get("[class='snake']")
  //       .should("have.css", "background-color", "rgb(30, 60, 200)")
  //       .and("have.length", 3);
  //   });
  // });

  // it("should have a food item", () => {
  //   cy.get("[class='food']").should("have.length", 1);
  // });

  // it("first snake should move right by default", () => {
  //   cy.get("[class='snake-body1']").within(() => {
  //     cy.get("[class='snake']").should("have.css", "left", "12px");
  //     cy.wait(250);
  //     cy.get("[class='snake']").should("have.css", "left", "24px");
  //     cy.wait(250);
  //   });
  // });

  // it("direction should change on pressing WASD", () => {
  //   cy.get("[class='board']").trigger("keydown", { keyCode: 83 });
  //   cy.get("[class='snake']").should("have.css", "top", "24px");
  //   cy.wait(500);
  //   cy.get("[class='board']").trigger("keydown", { keyCode: 65 });
  //   cy.get("[class='snake']").should("have.css", "left", "24px");

  //   cy.get("[class='board']").trigger("keydown", { keyCode: 87 });
  //   cy.get("[class='snake']").should("have.css", "left", "12px");

  //   cy.get("[class='board']").trigger("keydown", { keyCode: 68 });
  //   cy.wait(250);
  // });

  // it("gameover if snake hits wall", () => {
  //   cy.get("[class='board']").trigger("keydown", { keyCode: 87 });
  //   cy.wait(1500);
  //   cy.get("[id=':r3:']").contains("GAME OVER");
  //   cy.wait(1000);
  // });

  it("restart game", () => {
    cy.visit("http://localhost:3000/");
  });

  it("button gets enabled once difficulty is selected", () => {
    cy.get("[type='radio'][value='easy']").click();
    cy.get("button").contains("Start Game").should("be.enabled").click();
  });

  it("enlarge size on eating food", () => {
    cy.get("[class='food']").then(($food) => {
      let left = $food[0].style.left;
      let top = $food[0].style.top;

      cy.get("[class='snake-body1']").then(($snake) => {
        let snakeLeft = $snake[0].children[2].style.left;
        let snakeTop = $snake[0].children[2].style.top;

        while (snakeLeft != left) {
          let a = snakeLeft.split("%");
          let first = parseInt(a[0]);
          first = first + 2 + "%";
          snakeLeft = first;
          cy.log(snakeLeft);
          cy.wait(250);
        }
        if (snakeTop < top) {
          cy.get("[class='board']").trigger("keydown", { keyCode: 83 });
          cy.log("1");
        } else {
          cy.get("[class='board']").trigger("keydown", { keyCode: 87 });
          cy.log("2");
        }

        // cy.waitUntil(() => snakeLeft == left).then(() => {
        //   if (snakeTop < top) {
        //     cy.get("[class='board']").trigger("keydown", { keycode: 83 });
        //   } else {
        //     cy.get("[class='board']").trigger("keydown", { keycode: 87 });
        //   }
        // });
      });
    });
  });

  it("should get enlarged", () => {});
});
