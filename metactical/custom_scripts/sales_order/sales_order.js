{% include 'erpnext/selling/sales_common.js' %}
var old_tax_template;
var base_in_words;
frappe.ui.form.on('Sales Order', {
	refresh: function(frm){
		//Clear update qty and rate button
		/*if(frm.doc.docstatus === 1 && frm.doc.status !== 'Closed'
			&& flt(frm.doc.per_delivered, 6) < 100 && flt(frm.doc.per_billed, 6) < 100) {
			frm.clear_custom_buttons();
		}*/
		
		setTimeout(() => {
			frm.remove_custom_button("Pick List", 'Create'); 
			frm.add_custom_button(__('Pick List'), () => frm.events.create_pick_list_custom(), __("Create"));
		}, 10);
		
		//Code for custom cancel button that saves cancel reason first
		if(frm.doc.docstatus == 1){
			frm.page.clear_secondary_action();
			frm.page.set_secondary_action(__("Cancel"), function(frm) {
				cur_frm.events.before_cancel_event();
			});
		}
	},
	
	onload: function(frm){
		old_tax_template = frm.doc.taxes_and_charges;
		base_in_words = frm.doc.base_in_words;
	},
	
	create_pick_list_custom() {
		frappe.model.open_mapped_doc({
			method: "metactical.custom_scripts.pick_list.pick_list.create_pick_list",
			frm: cur_frm
		})
	},
	
	before_cancel_event: function(frm){
		frappe.prompt([
			{'fieldname': 'cancel_reason', 'fieldtype': 'Small Text', 'label': 'Enter Reason', 'reqd': 1}
		],
		function(values){
			frappe.call({
				'method': 'metactical.custom_scripts.sales_order.sales_order.save_cancel_reason',
				'args': {
					'docname': cur_frm.docname,
					'cancel_reason': values.cancel_reason
				},
				'callback': function(r){
					cur_frm.savecancel();
				}
			});
		},
		'Please reason for cancellation.',
		'Cancel'
		)
	}
});


erpnext.selling.SalesOrderController = erpnext.selling.SalesOrderController.extend({
	customer_address: function(doc, dt, dn){
		if(doc.docstatus == 1){
			erpnext.utils.get_address_display(this.frm, "customer_address");		
		}
		else{
			erpnext.utils.get_address_display(this.frm, "customer_address");
			erpnext.utils.set_taxes_from_address(this.frm, "customer_address", "customer_address", "shipping_address_name");
		}
	}
});
$.extend(cur_frm.cscript, new erpnext.selling.SalesOrderController({frm: cur_frm}));

