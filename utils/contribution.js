export const calculateContributions = (receipt, members) => {
	
	// Calculate the total contribution for each member
	const memberContributions = {};
	for (const member of members) {
		memberContributions[member.name] = 0;
	}
	
	// map through list of items on receipt and calculate the individual contribution
	for (const item of receipt.items) {
		const numOwners = item.members.length || 1; // Ensure at least 1 owner
		const individualContribution = (item.amount / numOwners).toFixed(2);
		
		// for each contributing member, update their contribution on the memberContributions object
		for (const owner of item.members) {
			memberContributions[owner.name] += parseFloat(individualContribution);
		}
	}
	
	// Calculate the tax and tip contributions
	const numMembers = Object.keys(memberContributions).length;
	const taxContribution = ((receipt.tax || 0) / numMembers).toFixed(2);
	const tipContribution = ((receipt.tip || 0) / numMembers).toFixed(2);

	// Add tax and tip contributions to member contributions
	for (const memberName in memberContributions) {
		memberContributions[memberName] = (
			parseFloat(memberContributions[memberName]) +
			parseFloat(taxContribution) +
			parseFloat(tipContribution)
		).toFixed(2); // Round to 2 decimal places
	}

	// Create an array of member objects with name and contribution
	const memberArray = Object.keys(memberContributions).map((name) => ({
		name,
		contribution: memberContributions[name],
	}));

	return memberArray;
};
