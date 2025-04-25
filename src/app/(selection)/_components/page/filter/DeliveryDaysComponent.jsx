export default function DeliveryDaysComponent() {
    return (
        <div className="delivery-checkbox-group">
            <h3 className="delivery-title-cat">Способ получения</h3>

            <div className="options-group">
                <div className="option">
                    <input type="checkbox" id="todayCheckbox"/>
                    <label htmlFor="todayCheckbox">Сегодня</label>
                </div>
                <div className="option">
                    <input type="checkbox" id="delivery1to2Checkbox"/>
                    <label htmlFor="delivery1to2Checkbox">Поставка 1-2 дня</label>
                </div>
                <div className="option">
                    <input type="checkbox" id="delivery2to5Checkbox"/>
                    <label htmlFor="delivery2to5Checkbox">Поставка 2-5 дней</label>
                </div>
                <div className="option">
                    <input type="checkbox" id="delivery5to7Checkbox"/>
                    <label htmlFor="delivery5to7Checkbox">Поставка 5-7 дней</label>
                </div>
            </div>
        </div>
    )
}