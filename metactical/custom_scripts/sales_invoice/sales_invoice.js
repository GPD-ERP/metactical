frappe.ui.form.on('Sales Invoice', {
	refresh: function(frm){
		frm.add_custom_button(__('Journal Entry'), () => frm.events.create_journal_entry(frm), __("Create"));
	},
	
	create_journal_entry(frm){
		var d = new frappe.ui.Dialog({
			'fields': [
				{
					"fieldtype": "Select",
					"fieldname": "purpose",
					"options": "Credit Customer",
					"reqd": 1,
					"label": __('Purpose')
				},
				{
					"fieldtype": "Link",
					"options": "Account",
					"reqd": 1,
					"fieldname": "bank_cash",
					"label": __("Bank/Cash Account"),
					"get_query": function () {
						return {
							filters: [
								{"account_type": ["in", ["Bank", "Cash"]]},
								{"is_group": 0}
							]
						}
					}
				},
				{
					"fieldtype": "Currency",
					"fieldname": "credit_amount",
					"reqd": 1,
					"label": __("Credit Amount"),
					"onchange": function(e){
						console.log(e);
					}
				}
			],
			primary_action: function(){
				var values = d.get_values();
				return frappe.call({
					type: "GET",
					method: "metactical.custom_scripts.sales_invoice.sales_invoice.create_journal_entry",
					args: {
						"source_name": cur_frm.docname,
						"bank_cash": values.bank_cash,
						"amount": values.credit_amount
					},
					freeze: true,
					callback: function(r) {
						console.log(r);
						if(!r.exc) {
							var doc = frappe.model.sync(r.message);
							frappe.set_route("Form", r.message.doctype, r.message.name);
						}
					}
				});
				/*frappe.model.open_mapped_doc({
					method: "metactical.custom_scripts.sales_invoice.sales_invoice.create_journal_entry",
					frm: sent_frm
				});*/
				//d.hide();
			}
		});
		d.show();
		console.log(d);
	}
});
