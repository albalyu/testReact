// Заголовок таблицы
var TableHead = React.createClass({
    render: function() {
        return (
            <thead>
                <tr>
                    <th> # </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
        );
    }
});

// Строка таблицы с данными пользователя
var UserRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>
                    <input
                        id={"check"+this.props.user.id}
                        type="checkbox"
                        value={this.props.user.id}
                        onChange={this.handleChange}
                        checked={this.props.inStockOnly}
                        ref="inStockOnlyInput"
                    />
                </td>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.secondName}</td>
                <td>{this.props.user.username}</td>
            </tr>
        );
    }
});

// Тело таблицы
var TableBody = React.createClass({
    render: function() {
        var rows = [];

        // Проходим по массиву пользователей
        this.props.users.forEach(function(user) {
            // Добавляем пользователя в таблицу
            rows.push(<UserRow user={user} key={user.id} />);
        }.bind(this));

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});

// Таблица с данными пользователей
var UserTable = React.createClass({
    render: function() {
        return (
            <table>
                <TableHead />
                <TableBody
                    users={this.props.users}
                />
            </table>
        );
    }
});

// Чекбокс с кнопкой
var CheckedBar = React.createClass({
    handleChange: function() {
        // Фиксируем состояние главного чекбокса
        this.props.onUserInput(
            this.refs.inCheckedInput.getDOMNode().checked
        );

        // Приводим сотояние чекбоксов пользователей в соответствие с главным чекбоксом
        this.props.users.forEach(function(user) {
            if (this.props.inChecked == document.getElementById('check'+user.id).checked) {
                document.getElementById('check'+user.id).click();
            }
        }.bind(this));
    },

    handleClick: function() {
        var ids = '';

        // Формируем список айдишников выбранных строк
        this.props.users.forEach(function(user) {
            if (document.getElementById('check'+user.id).checked) {
                ids += ', ' + user.id;
            }
        }.bind(this));

        ids = ids.substr(2);
        var msg = ids != '' ? 'Выбрано: ' + ids : 'Ничего не выбрано';

        console.log(msg);
        document.getElementById('consol').innerHTML = msg;
    },

    render: function() {
        return (
            <form>
                <input
                    type="checkbox"
                    checked={this.props.inChecked}
                    ref="inCheckedInput"
                    onChange={this.handleChange}
                />

                <span>&nbsp;&nbsp;&nbsp;</span>

                <input
                    type="button"
                    value="Show selected id's"
                    onClick={this.handleClick}
                />
            </form>
        );
    }
});

// Контент страницы
var AllContent = React.createClass({
    getInitialState: function() {
        return {
            inChecked: false
        };
    },

    handleUserInput: function(inChecked) {
        this.setState({
            inChecked: inChecked
        });
    },

    render: function() {
        return (
            <div>
                <CheckedBar
                    inChecked={this.state.inChecked}
                    onUserInput={this.handleUserInput}
                    users={this.props.users}
                />
                <UserTable
                    users={this.props.users}
                />
            <p
                id="consol"
            />
            </div>

        );
    }
});

var users = [
    {id: 1, firstName: 'Mark', secondName: 'Otto', username: '@mdo'},
    {id: 2, firstName: 'Jacob', secondName: 'Thornton', username: '@fat'},
    {id: 3, firstName: 'Larry', secondName: 'the Bird', username: '@twitter'},
    {id: 4, firstName: 'Dick', secondName: 'Cat', username: '@fox'},
];

React.render(<AllContent users={users} />, document.body);
