window.onload = function() {
    const {a, div, span, li, ul, form, input, label, button} = React.DOM;

    class Form extends React.Component {
        constructor() {
            super();
            this.state = {
              firstName: '',
              lastName: '',
              email: '',
              website: ''
            };
        }
        componentWillMount() {
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleChange = this.handleChange.bind(this);
        }
        handleSubmit(e) {
            // Stop browser from submitting the form.
            e.preventDefault();
        
            // Validate here or directly when setting state.
            // Then send a POST request to your endpoint.
            axios
                .post('http://localhost:3001/api/contacts', {
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    email: this.state.email,
                    website: this.state.website
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        handleChange(e) {
            this.setState({
              [e.target.name]: e.target.value
            });
        }
        render(){

            return React.createElement('form', {onSubmit: this.handleSubmit},
                label({className: 'col-form-label'}, 'First name'),
                input({type: 'text', className:'form-control form-group ', name: 'firstName', value: this.state.firstName, onChange: this.handleChange}),
                label({className: 'col-form-label'}, 'Last name'),
                input({type: 'text', className:'form-control form-group ', name: 'lastName', value: this.state.lastName, onChange: this.handleChange}),
                label({className: 'col-form-label'}, 'Email'),
                input({type: 'text', className:'form-control form-group ', name: 'email', value: this.state.email, onChange: this.handleChange}),
                label({className: 'col-form-label'}, 'Website'),
                input({type: 'text', className:'form-control form-group ', name: 'website', value: this.state.website, onChange: this.handleChange}),
                button({className: 'btn btn-primary', type: 'submit'}, 'Add user')
            );
        }
    }
    class List extends React.Component {
        constructor(){
            super();
            this.state = {
                list: null
            }
        }
        componentWillMount() {
            this.setList.call(this);
        }
        setList() {
            axios
            .get('http://localhost:3001/api/contacts', {})
            .then((response) => {
                this.setState({
                    list: response.data
                })
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        render(){
            let items = null;

            if(this.state.list){
                items = this.state.list.map((item, key) => {
                    return li({className: 'user', key: key},
                        div({className: 'user__fname'}, item.first_name),
                        div({className: 'user__lname'}, item.last_name),
                        div({className: 'user__email'}, item.email),
                        div({className: 'user__website'}, item.website)
                    )
                });
            }

            return ul({className: 'users'}, items);
        }
    }

    class Contacts extends React.Component {
        constructor() {
            super();
            this.state = {};
        }
        
        render(){
            const form = React.createFactory(Form);
            const list = React.createFactory(List);
            const container = React.createElement('div', {className: 'container'}, 
                React.createElement('div', {className: 'row'}, 
                    React.createElement('div', {className: 'col-3'}, list()),
                    React.createElement('div', {className: 'col-3'}, form())
                )
            );

            return React.createElement('div', {className:'Contacts container'}, container);
        }
    }

    ReactDOM.render(
        React.createElement(Contacts, null, null),
        document.getElementById('root')
    );
};