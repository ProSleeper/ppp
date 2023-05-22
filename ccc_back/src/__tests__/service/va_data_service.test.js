const { StoreVAUrl, GetTotalVAUrl, RemoveVAUrl } = require("../../va/va_data_service.js");

test("va_data query test", async () => {
    const total_url_list_before = await GetTotalVAUrl();
    const list_len_before = total_url_list_before.length;

    const save_result = await StoreVAUrl("https://tv16.avsee.in/bbs/board.php?bo_table=javc&wr_id=1137825");
    expect(save_result).toEqual("save ok");

    const total_url_list_mid = await GetTotalVAUrl();
    const list_len_mid = total_url_list_mid.length;
    expect(list_len_before).toEqual(list_len_mid - 1);

    const remove_result = await RemoveVAUrl("https://tv16.avsee.in/bbs/board.php?bo_table=javc&wr_id=1137825");
    expect(remove_result).toEqual("delete ok");

    const total_url_list_after = await GetTotalVAUrl();
    const list_len_after = total_url_list_after.length;
    expect(list_len_before).toEqual(list_len_after);
});
