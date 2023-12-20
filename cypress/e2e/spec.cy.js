describe("Form Filling", () => {
	beforeEach(() => {
		cy.visit("/");

		cy.get('label:contains("Name") + input').as("nameInput");
		cy.contains("Email").siblings("input").as("emailInput");
		cy.get('label:contains("Number") + input').as("phoneInput");
		cy.contains("Gender").siblings("select").as("genderSelect");
		cy.contains("experience")
			.siblings()
			.children()
			.as("experienceRadioBtns");
		cy.contains("Skills").siblings().children().as("skillsCheckBoxes");
		cy.contains("Tools").siblings("select").as("toolsSelect");
		cy.contains("Details").siblings().as("detailsInput");
		cy.contains("Submit!").as("submitButton");
	});

	it("Sending the form with correct data", () => {
		cy.fixture("usersData").then((usersData) => {
			usersData.forEach((user) => {
				// Just in case we have more than one user
				cy.get("@nameInput").type(user.name);
				cy.get("@emailInput").type(user.email);
				cy.get("@phoneInput").type(user.phone);
				cy.get("@genderSelect").select(user.gender, { force: true });
				cy.get("@experienceRadioBtns")
					.find(`[value=${user.experience}]`)
					.click();
				user.skills.forEach((skill) => {
					// Just in case we have more than one skill
					cy.get("@skillsCheckBoxes")
						.find(`[value="${skill}"]`)
						.check();
				});
				cy.get("@toolsSelect").select(user.tool, { force: true });
				cy.get("@detailsInput").type(user.details);
				cy.get("@submitButton").click();
			});
			cy.get("#contact-form-success-header").should("exist");
		});
	});
	it("Sending a empty form", () => {
		cy.get("@submitButton").click();
    cy.get("#contact-form-success-header").should("not.exist");
	});

	it("Sending the form without important data", () => {
		cy.fixture("usersData").then((usersData) => {
			usersData.forEach((user) => {
				// Just in case we have more than one user
				cy.get("@emailInput").type(user.email);
				cy.get("@phoneInput").type(user.phone);
				cy.get("@genderSelect").select(user.gender, { force: true });
				cy.get("@experienceRadioBtns")
					.find(`[value=${user.experience}]`)
					.click();
				user.skills.forEach((skill) => {
					// Just in case we have more than one skill
					cy.get("@skillsCheckBoxes")
						.find(`[value="${skill}"]`)
						.check();
				});
				cy.get("@toolsSelect").select(user.tool, { force: true });
				cy.get("@detailsInput").type(user.details);
				cy.get("@submitButton").click();
			});
			cy.get("#contact-form-success-header").should("not.exist");
		});
	});
});
