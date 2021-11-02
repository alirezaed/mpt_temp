//------------------- Base Class -------------------
class TaskServiceBase {
	getAll(category, archive) {
		throw 'TaskServiceBase.getAll() is not implemented';
	}
	archive(id) {
		throw 'TaskServiceBase.archive() is not implemented';
	}
	unarchive(id) {
		throw 'TaskServiceBase.unarchive() is not implemented';
	}
	save(task) {
		throw 'TaskServiceBase.save() is not implemented';
	}
}
//------------------- Fake Implementation using localStorage -------------------
class TaskServiceFake extends TaskServiceBase {
	constructor() {
		super();
		
		this._load();
	}
	_load() {
		const _tasks = window.localStorage.getItem('_tasks');
		
		if (_tasks) {
			try {
				this._data = JSON.parse(_tasks);
			} catch (e) { }
		}
		
		if (!Array.isArray(this._data)) {
			this._data = [];
		}
	}
	_save() {
		window.localStorage.setItem('_tasks', JSON.stringify(this._data));
	}
	getAll(category, archive) {
		const _this = this;
		
		return new Promise((resolve, reject) => {
			let data = _this._data;
			
			if (category) {
				data = data.filter(m => m.Category == category);
			}
			
			if (archive != null) {
				data = data.filter(m => m.IsArchived == archive);
			}
			
			resolve({ Success: true, Status: 'Succeeded', Data: data });
		});
	}
	
	unarchive(id) {
		const _this = this;
		
		return new Promise((resolve, reject) => {
			const task = _this._data.find(m => m.Id == id);
			
			if (task) {
				task.IsArchived = false;
			
				this._save();
				
				resolve({ Success: true, Status: 'Succeeded' });
			} else {
				resolve({ Success: false, Status: 'NotFound' });
			}
		});
	}
	
	archive(id) {
		const _this = this;
		
		return new Promise((resolve, reject) => {
			const task = _this._data.find(m => m.Id == id);
			
			if (task) {
				task.IsArchived = true;
				
				this._save();
				
				resolve({ Success: true, Status: 'Succeeded' });
			} else {
				resolve({ Success: false, Status: 'NotFound' });
			}
		});
	}
	
	save(task) {
		const _this = this;
		const id = task.Id;
		return new Promise((resolve, reject) => {
			if (task.Id) {
				const taskIndex = _this._data.findIndex(m => m.Id == id);
				
				if (taskIndex >= 0) {
					_this._data[taskIndex].Title = task.Title;
					_this._data[taskIndex].Description = task.Description;
					_this._data[taskIndex].Category = task.Category;
					_this._data[taskIndex].CreatedBy = task.CreatedBy;
					_this._data[taskIndex].CreatedDate = task.CreatedDate;
					_this._data[taskIndex].Date = task.Date;
					_this._data[taskIndex].Color = task.Color;

					this._save();
					
					resolve({ Success: true, Status: 'Succeeded' });
				} else {
					resolve({ Success: false, Status: 'NotFound' });
				}
			} else {
				let _max_id = 0;
				
				for (var t of _this._data) {
					if (t.Id > _max_id) {
						_max_id = t.Id;
					}
				}
				
				task.Id = _max_id + 1;
				
				_this._data.push(task);
				
				_this._save();
				
				resolve({ Success: true, Status: 'Succeeded' });
			}
		});
	}
}
//------------------- Axios implementation -------------------
class TaskServiceAxios extends TaskServiceBase {
	// todo
}


export {
	TaskServiceBase,
	TaskServiceFake,
	TaskServiceAxios
}